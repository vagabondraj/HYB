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
    constent: {
        type : String,
        required : [true, "Message content is required"],
        trim : true
    },
    image: {
        type : String,
        default: null
    }
}, {timestamps : true});

export const Message = mongoose.model("Message", messageSchema);