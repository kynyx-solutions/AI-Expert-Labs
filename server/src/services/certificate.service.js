import Certificate from "../models/Certificate.js";
import { getEnrollmentPhoto } from "./enrollment.service.js";

export const normalizeCertificateId = (id = "") => String(id).trim().toUpperCase();

export const findCertificate = async (id) =>
  Certificate.findOne({ certificateId: normalizeCertificateId(id) });

/** Same as findCertificate, but also loads the photo for printing. */
export const findCertificateWithPhoto = async (id) =>
  Certificate.findOne({ certificateId: normalizeCertificateId(id) }).select("+photo.data");

/**
 * Issues a certificate. Uses the uploaded photo if there is one, otherwise the
 * photo from the learner's enrollment (when `enrollmentId` is given).
 */
export const createCertificate = async (payload, uploadedPhoto) => {
  let photo = uploadedPhoto;
  if (!photo && payload.enrollmentId) {
    const fromEnrollment = await getEnrollmentPhoto(payload.enrollmentId);
    if (fromEnrollment) photo = { data: fromEnrollment.data, contentType: fromEnrollment.contentType };
  }

  try {
    return await Certificate.create({
      ...payload,
      photo,
      certificateId: normalizeCertificateId(payload.certificateId),
    });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = "A certificate with this number already exists.";
    } else if (err.name === "ValidationError") {
      err.status = 400;
    }
    throw err;
  }
};

export const listCertificates = async ({ page = 1, limit = 25 } = {}) => {
  const skip = (Math.max(1, page) - 1) * limit;

  const [items, total] = await Promise.all([
    Certificate.find().sort({ issuedAt: -1 }).skip(skip).limit(limit),
    Certificate.countDocuments(),
  ]);

  return { items, total, page: Number(page), limit: Number(limit) };
};

export default { findCertificate, findCertificateWithPhoto, createCertificate, listCertificates };
