import { CERTIFICATE_ID_REGEX } from "../models/Certificate.js";
import { EMAIL_REGEX } from "../middleware/validateSubmission.js";
import { readDownloadToken } from "../config/certAccess.js";
import {
  createCertificate,
  findCertificate,
  findCertificateWithPhoto,
  listCertificates,
  normalizeCertificateId,
} from "../services/certificate.service.js";
import { requestOtp, verifyOtp } from "../services/certificateAccess.service.js";
import { renderCertificatePdf } from "../services/certificatePdf.service.js";

const notFound = (res) =>
  res.status(404).json({ success: false, message: "No certificate found with this number." });

export const verify = async (req, res, next) => {
  try {
    const id = normalizeCertificateId(req.query.id);
    if (!CERTIFICATE_ID_REGEX.test(id)) return notFound(res);

    const certificate = await findCertificate(id);
    if (!certificate) return notFound(res);

    res.json({ success: true, data: certificate.toPublic() });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    // JSON, or multipart when a `photo` file is attached.
    const {
      certificateId,
      serialNo,
      name,
      guardianName,
      email,
      program,
      hours,
      grade,
      conduct,
      centre,
      enrollmentId,
      fromDate,
      toDate,
      issuedAt,
    } = req.body || {};

    const photo = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined;

    const certificate = await createCertificate(
      {
        certificateId,
        serialNo,
        name,
        guardianName,
        email,
        program,
        hours,
        grade,
        conduct,
        centre,
        enrollmentId,
        fromDate,
        toDate,
        issuedAt,
      },
      photo
    );

    res.status(201).json({ success: true, data: certificate.toPublic() });
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await listCertificates({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const invalidEmail = (res) =>
  res.status(400).json({ success: false, message: "Enter a valid email address." });

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email || !EMAIL_REGEX.test(String(email).trim())) return invalidEmail(res);

    const { devOtp } = await requestOtp(email);

    res.json({
      success: true,
      message: "If this email has certificates with us, a 6-digit code is on its way.",
      ...(devOtp && { devOtp }),
    });
  } catch (err) {
    next(err);
  }
};

export const confirmOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body || {};
    if (!email || !EMAIL_REGEX.test(String(email).trim())) return invalidEmail(res);
    if (!/^\d{6}$/.test(String(otp ?? "").trim())) {
      return res.status(400).json({ success: false, message: "Enter the 6-digit code." });
    }

    const result = await verifyOtp(email, otp);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const download = async (req, res, next) => {
  try {
    const id = normalizeCertificateId(req.query.id);
    const token = (req.get("authorization") || "").replace(/^Bearer\s+/i, "");

    if (!readDownloadToken(token).includes(id)) {
      return res.status(401).json({
        success: false,
        message: "Your session has expired. Verify your email again to download.",
      });
    }

    const certificate = await findCertificateWithPhoto(id);
    if (!certificate || certificate.revoked) return notFound(res);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="AIxperts-Labs-Certificate-${id.replace(/\//g, "-")}.pdf"`
    );
    res.setHeader("Cache-Control", "private, no-store");
    await renderCertificatePdf(certificate, res);
  } catch (err) {
    next(err);
  }
};

export default { verify, create, list, sendOtp, confirmOtp, download };
