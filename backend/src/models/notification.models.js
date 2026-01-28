import mongoose from "mongoose";
import { NOTIFICATION_TYPES } from "../constants.js";

const notificationSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type : String,
        enum : NOTIFICATION_TYPES,
        required: true
    },
    request: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Request"
    },
    message: {
        type:String,
        required:true,
        trim : true
    },
    isRead: {
        type:Boolean,
        default:false
    }
}, {timestamps:true});

notificationSchema.index({user:1, isRead:1, createdAt: -1});
export const Notification = mongoose.model("Notification", notificationSchema);