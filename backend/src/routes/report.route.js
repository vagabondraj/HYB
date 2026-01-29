import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {checkBlockedUser} from "../middlewares/blockUser.middleware.js";
import { createReport, getAllReports,getReportById, updateReport, getReportsByUser, unblockUser} from "../controllers/report.controller.js";
import {isAdmin} from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post(
  '/',
  checkBlockedUser, 
  createReport
);

router.get("/user/:userId", isAdmin, getReportsByUser);

router.post("/unblock/:userId", isAdmin, unblockUser);

// General admin routes
router.get("/", isAdmin, getAllReports);

router.get("/:id", isAdmin, getReportById);

router.patch("/:id/status", isAdmin, updateReport);


export default router;