import { BATCH_TYPES, PROFILES } from "../models/Enrollment.js";
import { EMAIL_REGEX } from "./validateSubmission.js";

const PHONE_REGEX = /^[0-9+ ]{10,14}$/;
const GSTIN_REGEX = /^[0-9A-Z]{15}$/;

export const validateEnrollment = (req, res, next) => {
  const body = req.body || {};
  const value = (key) => String(body[key] ?? "").trim();

  const errors = [];
  const isCustom = value("requestType") === "custom";

  if (isCustom) {
    const topic = value("customTopic");
    if (topic.length < 3 || topic.length > 120) errors.push("tell us what you want to learn (3–120 characters)");
    if (value("customDetails").length > 1000) errors.push("keep the extra details under 1000 characters");
  } else if (!value("program")) {
    errors.push("choose a program");
  }
  if (!BATCH_TYPES.includes(value("batchType"))) errors.push("choose a Regular or Weekend batch");
  if (!value("name")) errors.push("name is required");
  if (!value("guardianName")) errors.push("father's / mother's name is required");
  if (!PHONE_REGEX.test(value("phone"))) errors.push("a valid WhatsApp number is required");
  if (!EMAIL_REGEX.test(value("email"))) errors.push("a valid email is required");
  if (!PROFILES.includes(value("profile"))) errors.push("tell us what describes you best");
  if (value("gstin") && !GSTIN_REGEX.test(value("gstin").toUpperCase())) {
    errors.push("GSTIN must be 15 letters and numbers");
  }
  // Custom requests are planned first, so the photo can come later.
  if (!req.file && !isCustom) errors.push("add a passport-size photo (it is printed on the certificate)");
  if (value("consent") !== "true") errors.push("please accept the terms to continue");

  if (errors.length) {
    const message = errors.join("; ");
    return res.status(400).json({ success: false, message: message[0].toUpperCase() + message.slice(1) + "." });
  }

  next();
};

export default validateEnrollment;
