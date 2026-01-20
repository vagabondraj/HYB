import multer from "multer";
import path from "path";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";

/* =========================
   Ensure upload directories
========================= */

const uploadDirs = [
  "public/temp",
  "public/uploads/avatars",
  "public/uploads/requests"
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/* =========================
   Storage configuration
========================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

/* =========================
   File filter (images only)
========================= */

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        "Only image files are allowed (jpeg, jpg, png, gif, webp)"
      )
    );
  }
};

/* =========================
   Multer instance
========================= */

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter
});

/* =========================
   Multer error handler
========================= */

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return next(
        new ApiError(400, "File size too large. Maximum size is 5MB.")
      );
    }
    return next(new ApiError(400, err.message));
  }

  if (err) {
    return next(err);
  }

  next();
};
