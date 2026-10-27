import { createHmac, timingSafeEqual } from "node:crypto";
import env from "./env.js";

const TOKEN_TTL_SECONDS = 30 * 60;

const secret = () => {
  if (env.certSessionSecret) return env.certSessionSecret;
  if (env.otpDevMode) return "dev-only-secret-change-me";
  throw new Error(
    "CERT_SESSION_SECRET is not set. Add a long random string to server/.env."
  );
};

const sign = (value) => createHmac("sha256", secret()).update(value).digest("base64url");

const safeEqual = (a, b) =>
  a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export const hashOtp = (email, code) => sign(`otp:${email}:${code}`);

export const otpMatches = (email, code, codeHash) =>
  safeEqual(hashOtp(email, String(code).trim()), codeHash);

/**
 * Short-lived token listing the certificate IDs a learner unlocked with OTP.
 * Sent back as `Authorization: Bearer <token>` to download the PDFs.
 */
export const createDownloadToken = (certificateIds) => {
  const payload = Buffer.from(
    JSON.stringify({
      ids: certificateIds,
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
};

export const readDownloadToken = (token = "") => {
  const [payload, sig] = String(token).split(".");
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return [];

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.exp > Date.now() / 1000 && Array.isArray(data.ids) ? data.ids : [];
  } catch {
    return [];
  }
};
