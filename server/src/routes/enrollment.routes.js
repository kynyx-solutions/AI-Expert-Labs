import { Router } from "express";
import { create, list, photo } from "../controllers/enrollment.controller.js";
import { uploadPhoto } from "../middleware/uploadPhoto.js";
import { validateEnrollment } from "../middleware/validateEnrollment.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

// POST /api/enrollments — multipart form from the /enroll page (optional `photo` file)
router.post("/", uploadPhoto, validateEnrollment, create);

// GET /api/enrollments — admin-only, list enrollments
router.get("/", adminAuth, list);

// GET /api/enrollments/:enrollmentId/photo — admin-only, the learner's photo
router.get("/:enrollmentId/photo", adminAuth, photo);

export default router;
