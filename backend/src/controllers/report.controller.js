import {Report} from '../models/report.models.js';
import {User} from '../models/user.models.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Notification } from "../models/notification.models.js";
import {validateReport} from "../utils/reportValidatorAI.js"
import {REPORT_TRRESHOLD} from "../constants.js";

const notifyAdmins = async (report, reporter, reportedUser) => {
  const admins = await User.find({ role: "admin" }).select("_id");

  if (!admins.length) return;

  const notifications = admins.map((admin) => ({
    user: admin._id,
    type: "report",
    title: "New User Report",
    message: `📋 ${reporter.userName} reported ${reportedUser.userName} for: ${report.reason}`,
    data: {
      reportId: report._id,
      reportedUserId: reportedUser._id,
    },
    isRead: false,
  }));

  await Notification.insertMany(notifications);
};

const notifyReportedUser = async (userId, warningCount, isBlocked) => {
  await Notification.create({
    user: userId,
    type: isBlocked ? "account_blocked" : "warning",
    title: isBlocked ? "Account Blocked" : "Account Warning",
    message: isBlocked
      ? "🚫 Your account has been blocked due to repeated violations."
      : `⚠️ You have received a warning (${warningCount}/11). Continued violations may block your account.`,
    data: { warningCount, isBlocked },
    isRead: false,
  });
};

const createReport = asyncHandler(async (req, res) => {
  const { reportedUserId, reason, description } = req.body;

  if (!reportedUserId || !reason) {
    throw new ApiError(400, "Reported user and reason are required");
  }

  if (reportedUserId.toString() === req.user._id.toString()) {
    throw new ApiError(400, "Can't report yourself");
  }

  const reportedUser = await User.findById(reportedUserId);
  if (!reportedUser) {
    throw new ApiError(404, "User not found");
  }

  const reporter = await User.findById(req.user._id);

  const isValidReport = await validateReport({
    reason,
    description: description || "",
  });

  const report = await Report.create({
    reportedUser: reportedUserId,
    reportedBy: req.user._id,
    reason,
    description: description || "",
    status: "pending",
    isValidated: isValidReport,
    validatedAt: isValidReport ? new Date() : null,
  });

  // 🔔 Notify admins ALWAYS
  await notifyAdmins(report, reporter, reportedUser);

  let warningCount = reportedUser.warningCount;
  let isBlocked = reportedUser.isBlocked;

  if (isValidReport) {
    reportedUser.warningCount += 1;
    warningCount = reportedUser.warningCount;

    if (warningCount >= REPORT_TRRESHOLD) {
      reportedUser.isBlocked = true;
      reportedUser.blockedAt = new Date();
      isBlocked = true;
    }

    await reportedUser.save();

    await notifyReportedUser(reportedUserId, warningCount, isBlocked);
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        report: {
          _id: report._id,
          reason: report.reason,
          isValidated: isValidReport,
          createdAt: report.createdAt,
        },
        reportedUserStatus: {
          warningCount,
          isBlocked,
        },
      },
      isValidReport
        ? "Report validated and warning issued"
        : "Report submitted for manual review"
    )
  );
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
    .populate("reportedUser", "fullName userName email warningCount isBlocked")
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
    
    const validStatuses = ["pending", "reviewed", "resolved", "dismissed"];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid report status");
    }

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