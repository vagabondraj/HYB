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
        trim: true,
        minlength: [2, "Answer must be at least 2 char"],
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    answeredBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    downvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    
}, {timestamps : true});

// vote cnt
answerSchema.virtual("voteCount").get(function () {
  return this.upvotes.length - this.downvotes.length;
});

answerSchema.index({question:1, createdAt: -1});
answerSchema.index({answeredBy: 1});
answerSchema.set("toJSON", { virtuals: true });
answerSchema.set("toObject", { virtuals: true });

export const Answer = mongoose.model("Answer", answerSchema);