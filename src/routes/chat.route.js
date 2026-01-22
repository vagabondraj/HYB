import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload, handleMulterError } from "../middlewares/multer.middleware.js";
import { getChatById, getMessages, getMyChats, sendMessage } from "../controllers/chat.controller.js";

const router = Router();
router.use(verifyJWT);

router.get("/", getMyChats);
router.get("/:id", getChatById);

router.post("/:id/messages",
    upload.single("image"),
    handleMulterError,
    sendMessage
);

router.get("/:id/messages", getMessages);

export default router;