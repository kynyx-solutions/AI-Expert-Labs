import mongoose from "mongoose";
import { CENTRE_IDS } from "../config/centres.js";

const { Schema } = mongoose;

// Our verification number, printed at the foot of the certificate, e.g. AXL/2026/0001
export const CERTIFICATE_ID_REGEX = /^[A-Z]{2,6}\/\d{4}\/\d{3,}$/;

// Printed in English and Hindi on the "conduct" lines of the NSIC certificate.
export const CONDUCT = {
  Excellent: "उत्कृष्ट",
  "Very Good": "बहुत अच्छा",
  Good: "अच्छा",
  Satisfactory: "संतोषजनक",
};

const certificateSchema = new Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: CERTIFICATE_ID_REGEX,
    },
    // NSIC serial number, printed as "क्रमांक / S. No."
    serialNo: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Printed as "son / daughter of"
    guardianName: {
      type: String,
      required: true,
      trim: true,
    },
    // Private: used only to send the download OTP, never returned by toPublic().
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    program: {
      type: String,
      required: true,
      trim: true,
    },
    hours: {
      type: Number,
      min: 0,
    },
    grade: {
      type: String,
      trim: true,
      default: "",
    },
    conduct: {
      type: String,
      enum: Object.keys(CONDUCT),
      default: "Good",
    },
    centre: {
      type: String,
      enum: CENTRE_IDS,
      default: CENTRE_IDS[0],
    },
    // Passport photo printed on the certificate. Uploaded when issuing, or copied from the enrollment.
    photo: {
      data: { type: Buffer, select: false },
      contentType: String,
    },
    enrollmentId: {
      type: String,
      trim: true,
      default: "",
    },
    fromDate: Date,
    toDate: Date,
    // Printed as "दिनांक / Date"
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/** Fields safe to show to anyone who has the certificate number. */
certificateSchema.methods.toPublic = function toPublic() {
  return {
    certificateId: this.certificateId,
    serialNo: this.serialNo,
    name: this.name,
    program: this.program,
    hours: this.hours,
    grade: this.grade,
    conduct: this.conduct,
    fromDate: this.fromDate,
    toDate: this.toDate,
    issuedAt: this.issuedAt,
    revoked: this.revoked,
  };
};

export const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
