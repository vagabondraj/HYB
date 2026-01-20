import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    content: {
        type : String,
        required: [true, "Content is required"],
        trim : true
    },
    askedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    }
}, { timeseries: true});

export const Question = mongoose.model("Question", questionSchema);