import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "RESEND_API_KEY", "MAIL_TO"];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  // eslint-disable-next-line no-console
  console.warn(
    `[env] Warning: missing environment variables: ${missing.join(
      ", "
    )}. Copy server/.env.example to server/.env and fill in your credentials.`
  );
}

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const primaryFrontendUrl = frontendUrl.split(",")[0].trim();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  mongodbUri: process.env.MONGODB_URI || "",

  frontendUrl,

  // Public website URL, printed at the foot of certificates as where to verify them.
  siteUrl: (
    process.env.SITE_URL ||
    (primaryFrontendUrl !== "*" ? primaryFrontendUrl : "https://aixpertslabs.com")
  ).replace(/\/+$/, ""),

  resendApiKey: process.env.RESEND_API_KEY || "",

  mailFrom: process.env.MAIL_FROM || "AIxperts Labs <onboarding@resend.dev>",
  mailTo: process.env.MAIL_TO || "",

  sendAutoReply: process.env.SEND_AUTO_REPLY !== "false",

  adminApiKey: process.env.ADMIN_API_KEY || "",

  // Signs the short-lived token that lets a learner download their certificate PDFs after OTP.
  certSessionSecret: process.env.CERT_SESSION_SECRET || "",

  // Local testing only: OTPs are returned in the API response instead of emailed.
  otpDevMode: process.env.OTP_DEV_MODE === "true",
};

export default env;
