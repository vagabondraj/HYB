import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  changeUserPassword
} from "../controllers/auth.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", verifyJWT, getCurrentUser);
router.put("/update-profile", verifyJWT, updateUserProfile);
router.put("/change-password", verifyJWT, changeUserPassword);

export default router;