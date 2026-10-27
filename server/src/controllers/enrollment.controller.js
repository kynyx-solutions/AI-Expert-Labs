import {
  createEnrollment,
  getEnrollmentPhoto,
  listEnrollments,
} from "../services/enrollment.service.js";

export const create = async (req, res, next) => {
  try {
    const body = req.body;
    const value = (key) => String(body[key] ?? "").trim();

    const photo = req.file
      ? { data: req.file.buffer, contentType: req.file.mimetype, filename: req.file.originalname }
      : undefined;

    const isCustom = value("requestType") === "custom";

    const enrollment = await createEnrollment(
      {
        requestType: isCustom ? "custom" : "program",
        program: isCustom ? `Custom course: ${value("customTopic")}` : value("program"),
        programSlug: isCustom ? "custom" : value("programSlug"),
        customTopic: isCustom ? value("customTopic") : "",
        customDetails: isCustom ? value("customDetails") : "",
        batchType: value("batchType"),
        name: value("name"),
        guardianName: value("guardianName"),
        phone: value("phone"),
        email: value("email"),
        profile: value("profile"),
        organization: value("organization"),
        gstin: value("gstin"),
        ip: req.ip,
        userAgent: req.get("user-agent") || "",
      },
      photo
    );

    res.status(201).json({
      success: true,
      data: {
        enrollmentId: enrollment.enrollmentId,
        requestType: enrollment.requestType,
        program: enrollment.program,
        batchType: enrollment.batchType,
        emailSent: enrollment.emailSent,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const result = await listEnrollments({
      status,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const photo = async (req, res, next) => {
  try {
    const found = await getEnrollmentPhoto(req.params.enrollmentId);
    if (!found) return res.status(404).json({ success: false, message: "No photo for this enrollment." });

    res.setHeader("Content-Type", found.contentType);
    res.setHeader("Cache-Control", "private, no-store");
    res.send(found.data);
  } catch (err) {
    next(err);
  }
};

export default { create, list, photo };
