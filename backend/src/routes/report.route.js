import { Router } from "express";
import { verifyJWT, authorize } from "../middlewares/auth.middleware.js";
import { createReport, getAllReports, updateReport } from "../controllers/report.controller.js";

const router = Router();

router.use(verifyJWT);

router.post("/", createReport);

router.get("/", authorize("admin", "moderator"),
getAllReports);

router.put("/:id", authorize("admin", "moderator"),
updateReport);

export default router;