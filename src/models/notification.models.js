import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    uer: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type : String,
        enum : ['NEW_RESPONSE', 'MESSAGE', 'STATUS_UPDATE'],
        required: true
    },
    request: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Request"
    },
    message: {
        type:String,
        required:true
    },
    isRead: {
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps:true});

notificationSchema.index({suer:1, isRead:1, createdAt: -1});
export const Notification = mongoose.model("Notification", notificationSchema);