import mongoose from "mongoose";
import { REPORT_REASON, REPORT_STATUS } from "../constants.js";

const reportSchema = mongoose.Schema({
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    reporter: {
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


    isValidated: {
    type: Boolean,
    default: false
  },
  
  // When the report was validated
  validatedAt: {
    type: Date,
    default: null
  },
  
  // AI confidence score (for future use)
  aiConfidence: {
    type: Number,
    min: 0,
    max: 1,
    default: null
  },
  
  // AI-determined severity
  aiSeverity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical', null],
    default: null
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
    reviewedAt: {
        type: Date,
        default:null
    },
    evidence: [{
    type: String
   }]
}, {timestamps : true});

// Indexes
reportSchema.index({ reportedUser: 1, createdAt:-1});
reportSchema.index({ reporter: 1 });
reportSchema.index({ status: 1});
reportSchema.index({ isValidated: 1 });

// Virtual to get reporter info
reportSchema.virtual('reporterInfo', {
  ref: 'User',
  localField: 'reporter',
  foreignField: '_id',
  justOne: true
});

// Virtual to get reported user info
reportSchema.virtual('reportedUserInfo', {
  ref: 'User',
  localField: 'reportedUser',
  foreignField: '_id',
  justOne: true
});

// Prevent duplicate reports (same reporter → same user → same reason)
reportSchema.index(
  { reportedUser: 1, reporter: 1, reason: 1 },
  { unique: true }
);

export const Report = mongoose.model("Report", reportSchema);