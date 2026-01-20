import mongoose from "mongoose";

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
        required: [true, "Report reason is required"],
        trim : true
    },
    description: {
        type : String,
        trim : true
    }
}, {timestamps : true});

export const Report = mongoose.model("Report", reportSchema);