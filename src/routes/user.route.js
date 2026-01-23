import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload, handleMulterError } from "../middlewares/multer.middleware.js";
import { getUserProfile, searchUsers, uploadAvatar } from "../controllers/user.controller.js";

const router = Router();

router.get("/search", searchUsers);
router.get("/profile/:userName", getUserProfile);
router.put("/avatar", verifyJWT, upload.single("avatar"), handleMulterError, uploadAvatar);

export default router;

