import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Chat',
        required : true,
    },
    sender: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    content: {
        type : String,
        required: [true, "Message content is required"],
        trim : true
    },
    image: {
        type : String,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps : true});


messageSchema.index({chat : 1, createdAt: -1});
messageSchema.index({sender: 1});
export const Message = mongoose.model("Message", messageSchema);