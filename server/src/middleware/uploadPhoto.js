import multer from "multer";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PHOTO_BYTES, files: 1, fields: 20 },
  fileFilter: (req, file, callback) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) return callback(null, true);
    callback(Object.assign(new Error("Upload the photo as a JPG or PNG file."), { status: 400 }));
  },
}).single("photo");

/** Parses a multipart form with an optional `photo` field, with friendly error messages. */
export const uploadPhoto = (req, res, next) => {
  upload(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      const message =
        err.code === "LIMIT_FILE_SIZE" ? "The photo must be under 2 MB." : "Invalid upload. Please try again.";
      return res.status(err.code === "LIMIT_FILE_SIZE" ? 413 : 400).json({ success: false, message });
    }

    next(err);
  });
};

export default uploadPhoto;
