import { Router } from "express";
import submissionRoutes from "./submission.routes.js";
import certificateRoutes from "./certificate.routes.js";
import enrollmentRoutes from "./enrollment.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

router.use("/submissions", submissionRoutes);
router.use("/certificates", certificateRoutes);
router.use("/enrollments", enrollmentRoutes);

export default router;
