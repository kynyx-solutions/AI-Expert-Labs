import { Router } from "express";
import {
  confirmOtp,
  create,
  download,
  list,
  sendOtp,
  verify,
} from "../controllers/certificate.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { uploadPhoto } from "../middleware/uploadPhoto.js";

const router = Router();

// GET /api/certificates/verify?id=AXL/2026/0001 — public verification
router.get("/verify", verify);

// POST /api/certificates/otp/send — emails a download code to the learner
router.post("/otp/send", sendOtp);

// POST /api/certificates/otp/verify — checks the code, returns certificates + download token
router.post("/otp/verify", confirmOtp);

// GET /api/certificates/download?id=... — PDF, requires `Authorization: Bearer <token>`
router.get("/download", download);

// POST /api/certificates — admin-only, issue a certificate (JSON, or multipart with a `photo` file)
router.post("/", adminAuth, uploadPhoto, create);

// GET /api/certificates — admin-only, list issued certificates
router.get("/", adminAuth, list);

export default router;
