import { FORM_TYPES } from "../models/Submission.js";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateSubmission = (req, res, next) => {
  const { formType, name, email } = req.body || {};

  const errors = [];

  if (!formType || !FORM_TYPES.includes(formType)) {
    errors.push(`formType must be one of: ${FORM_TYPES.join(", ")}`);
  }
  if (formType !== "newsletter" && (!name || !String(name).trim())) {
    errors.push("name is required");
  }
  if (!email || !EMAIL_REGEX.test(String(email).trim())) {
    errors.push("a valid email is required");
  }

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors.join("; ") });
  }

  next();
};

export default validateSubmission;
