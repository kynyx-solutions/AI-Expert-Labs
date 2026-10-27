import { randomInt } from "node:crypto";
import Enrollment from "../models/Enrollment.js";
import { sendEnrollmentEmails } from "./mail.service.js";

// AXL-ENR-… for a listed program, AXL-REQ-… for a custom course request.
const newEnrollmentId = (requestType) =>
  `AXL-${requestType === "custom" ? "REQ" : "ENR"}-${randomInt(10000, 100000)}`;

/**
 * Saves the enrollment under a fresh ID (retrying on the rare collision), then
 * emails the team and the learner. If email fails, the enrollment is still
 * saved and `emailSent` is false.
 */
export const createEnrollment = async (payload, photo) => {
  let enrollment;

  for (let attempt = 0; !enrollment; attempt += 1) {
    try {
      enrollment = await Enrollment.create({
        ...payload,
        photo,
        enrollmentId: newEnrollmentId(payload.requestType),
      });
    } catch (err) {
      if (err.code !== 11000 || attempt >= 4) throw err;
    }
  }

  try {
    await sendEnrollmentEmails(enrollment, photo);
    enrollment.emailSent = true;
  } catch (err) {
    console.error("[enrollment.service] Failed to send email:", err.message);
    enrollment.emailSent = false;
  }
  await enrollment.save();

  return enrollment;
};

export const listEnrollments = async ({ status, page = 1, limit = 25 } = {}) => {
  const query = {};
  if (status) query.status = status;

  const skip = (Math.max(1, page) - 1) * limit;

  const [items, total] = await Promise.all([
    Enrollment.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enrollment.countDocuments(query),
  ]);

  return { items, total, page: Number(page), limit: Number(limit) };
};

export const getEnrollmentPhoto = async (enrollmentId) => {
  const enrollment = await Enrollment.findOne({ enrollmentId }).select("+photo.data");
  return enrollment?.photo?.data ? enrollment.photo : null;
};

export default { createEnrollment, listEnrollments, getEnrollmentPhoto };
