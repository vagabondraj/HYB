import { Router } from "express";
import {
    createResponse,
    getResponsesForRequest,
    getMyResponses,
    acceptResponse,
    rejectResponse
} from "../controllers/response.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload, handleMulterError} from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

router.post("/create-response",
    upload.single("image"),
    handleMulterError,
    createResponse
);

router.get("get-my-res", getMyResponses);

router.get("/get-req-for-res/:req_id", getResponsesForRequest);

router.patch("/:id/accept", acceptResponse);

router.patch("/:id/reject", rejectResponse);

export default router;