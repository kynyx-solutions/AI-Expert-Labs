import { randomInt } from "node:crypto";
import Certificate from "../models/Certificate.js";
import Otp from "../models/Otp.js";
import env from "../config/env.js";
import { createDownloadToken, hashOtp, otpMatches } from "../config/certAccess.js";
import { sendCertificateOtpEmail } from "./mail.service.js";

const OTP_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

const httpError = (status, message) => Object.assign(new Error(message), { status });

export const normalizeEmail = (email = "") => String(email).trim().toLowerCase();

const findDownloadable = (email) =>
  Certificate.find({ email, revoked: false }).sort({ issuedAt: -1 });

/**
 * Issues a code for this email. A code is stored whether or not the email has
 * certificates (but only emailed if it does), so responses and cooldowns look
 * the same either way and the form can't be used to find out who studied here.
 */
export const requestOtp = async (rawEmail) => {
  const email = normalizeEmail(rawEmail);

  const existing = await Otp.findOne({ email });
  if (existing && Date.now() - existing.sentAt.getTime() < RESEND_COOLDOWN_MS) {
    throw httpError(429, "Please wait a minute before requesting another code.");
  }

  const code = String(randomInt(100000, 1000000));
  await Otp.findOneAndUpdate(
    { email },
    {
      codeHash: hashOtp(email, code),
      attempts: 0,
      sentAt: new Date(),
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    },
    { upsert: true, setDefaultsOnInsert: true }
  );

  if (env.otpDevMode) return { devOtp: code };

  const certificates = await findDownloadable(email);
  if (certificates.length) await sendCertificateOtpEmail(email, code);

  return {};
};

export const verifyOtp = async (rawEmail, code) => {
  const email = normalizeEmail(rawEmail);

  // Count the attempt atomically so parallel guesses can't exceed MAX_ATTEMPTS.
  const record = await Otp.findOneAndUpdate(
    { email, attempts: { $lt: MAX_ATTEMPTS }, expiresAt: { $gt: new Date() } },
    { $inc: { attempts: 1 } },
    { new: true }
  );

  if (!record) {
    const pending = await Otp.findOne({ email, expiresAt: { $gt: new Date() } });
    throw pending
      ? httpError(429, "Too many attempts. Request a new code.")
      : httpError(400, "This code has expired. Request a new one.");
  }

  if (!otpMatches(email, code, record.codeHash)) {
    throw httpError(400, "That code is incorrect. Check it and try again.");
  }

  await record.deleteOne();

  const certificates = await findDownloadable(email);
  return {
    certificates: certificates.map((c) => c.toPublic()),
    token: createDownloadToken(certificates.map((c) => c.certificateId)),
  };
};

export default { requestOtp, verifyOtp };
