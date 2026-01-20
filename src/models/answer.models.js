import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    question: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    content: {
        type: String,
        required: [true, "Answer Content is required"],
        trim: true
    },
    answeredBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default : Date.now
    }
});

export const Answer = mongoose.model("Answer", answerSchema);