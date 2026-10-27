import mongoose from "mongoose";

const { Schema } = mongoose;

export const BATCH_TYPES = ["Regular", "Weekend"];

export const PROFILES = [
  "Student",
  "Working professional",
  "MSME owner",
  "Teacher / educator",
  "Job seeker",
];

const enrollmentSchema = new Schema(
  {
    // Shown to the learner after enrolling, e.g. AXL-ENR-48213
    enrollmentId: {
      type: String,
      required: true,
      unique: true,
    },
    program: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    programSlug: {
      type: String,
      trim: true,
      default: "",
    },
    batchType: {
      type: String,
      enum: BATCH_TYPES,
      required: true,
    },
    // Printed on the certificate, so it must be exactly as the learner wants it.
    name: {
      type: String,
      required: true,
      trim: true,
    },
    guardianName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    profile: {
      type: String,
      enum: PROFILES,
      required: true,
    },
    organization: {
      type: String,
      trim: true,
      default: "",
    },
    gstin: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },
    // Passport-size photo, kept with the enrollment (max 2 MB, so it fits well inside a document).
    photo: {
      data: { type: Buffer, select: false },
      contentType: String,
      filename: String,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled"],
      default: "new",
      index: true,
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    ip: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
