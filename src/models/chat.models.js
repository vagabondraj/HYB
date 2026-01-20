import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    request: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Request",
        required : true
    },
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    }],
}, {timestamps : true});

export const Chat = mongoose.model("Chat", chatSchema);