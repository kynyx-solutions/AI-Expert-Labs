import mongoose from "mongoose";

const { Schema } = mongoose;

// One pending certificate-download code per email address. Only a hash of the code is stored.
const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    codeHash: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    sentAt: {
      type: Date,
      required: true,
    },
    // MongoDB deletes the document automatically once this time passes.
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
