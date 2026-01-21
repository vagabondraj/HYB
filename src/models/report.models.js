import mongoose from "mongoose";
import { REPORT_REASON, REPORT_STATUS } from "../constants.js";

const reportSchema = mongoose.Schema({
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    reason: {
        type : String,
        enum: REPORT_REASON,
        required: [true, "Report reason is required"],
        trim : true
    },
    description: {
        type : String,
        required: true,
        trim : true,
        maxlength: [500, "Must not exceed 500 char"]
    },
    status: {
        type: String,
        enum : REPORT_STATUS,
        default: "pending"
    },
    reviewedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        default: null
    },
    reviewNotes:{
        type: String,
        trim:true
    },
    rewiesedAt: {
        type: Date,
        default:null
    }
}, {timestamps : true});

// Indexes
reportSchema.index({ reportedUser: 1 });
reportSchema.index({ reportedBy: 1 });
reportSchema.index({ status: 1, createdAt: -1 });

// Prevent duplicate reports (same reporter → same user → same reason)
reportSchema.index(
  { reportedUser: 1, reportedBy: 1, reason: 1 },
  { unique: true }
);

export const Report = mongoose.model("Report", reportSchema);