import {Report} from '../models/report.models.js';
import {User} from '../models/user.models.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Notification } from "../models/notification.models.js";

const createReport = asyncHandler(async (req, res, next) => {
    const {reportedUserId, reason, description} = req.body;
    if (!reportedUserId || !reason) {
    throw new ApiError(400, "Reported user and reason are required");
    }

    const reportedUser = await User.findById(reportedUserId);
    if(!reportedUser){
        return next(new ApiError(404, "User not found"));
    }

    if(reportedUserId.toString() === req.user._id.toString()){
        return next(new ApiError(400, "Can't report yourself"));
    }

    const report = await Report.create({
        reportedUser:reportedUserId,
        reportedBy:req.user._id,
        reason,
        description
    });

    await Notification.create({
    type: "REPORT_CREATED",
    message: `User @${reportedUser.userName} was reported by @${req.user.userName}`,
    meta: {
        reportId: report._id,
        reportedUser: reportedUserId,
        reportedBy: req.user._id
    },
    forRole: ["admin", "moderator"],
    });


    await report.populate("reportedUser", "fullName userName");

    return res
    .status(201)
    .json(new ApiResponse(201, { report }, "Report submitted successfully"));
});

const getAllReports = asyncHandler(async (req, res) => {
    const { status, page =1, limit = 20} = req.query;

    const query={};
    if(status){
        query.status = status;
    }

    const pageNum=parseInt(page);
    const limitNum=parseInt(limit);
    const skip = (pageNum-1)*limitNum;

    const reports=await Report.find(query)
    .populate("reportedUser", "fullName userName email")
    .populate("reportedBy", "fullName userName")
    .populate("reviewedBy", "fullName userName")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limitNum);

    const total= await Report.countDocuments(query);

    return res
    .status(200)
    .json(new ApiResponse(200, {
        reports, pagination:{
            total, page:pageNum, pages: Math.ceil(total/limitNum)
        }
    }, "Report retrived successfully"));
});

const updateReport = asyncHandler(async (req, res, next) =>{
    const { status, reviewNotes} = req.body;
    
    const report = await Report.findById(req.params.id);
    if(!report){
        return next(new ApiError(404, "Report not found"));
    }

    report.status=status;
    report.reviewNotes=reviewNotes;
    report.reviewedBy= req.user.id;
    report.reviewedAt=new Date();

    await report.save();

    return res
    .status(200)
    .json(new ApiResponse(200, {report}, "Report updated successfully"));
});

export {
    createReport,
    getAllReports,
    updateReport
};