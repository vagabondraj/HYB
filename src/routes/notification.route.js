import { Router } from "express";   

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getMyNotifications, markAllAsRead, markAsRead, deleteNotification } from "../controllers/notification.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/", getMyNotifications);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;