import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  changeUserPassword
} from "../controllers/auth.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { upload, handleMulterError } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

router.put(
  "/update-profile",
  verifyJWT,
  upload.single("avatar"),
  handleMulterError,
  updateUserProfile
);

router.put("/change-password", verifyJWT, changeUserPassword);

export default router;