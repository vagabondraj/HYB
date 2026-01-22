import mongoose, { Schema } from "mongoose";
import { QUESTION_CATEGORY } from "../constants";
import { acceptRequest } from "../controllers/request.controller";

const questionSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, "Question title is required"],
        trim: true,
        maxlength:[100, "Title can't exceed 100 char"],
    },
    content: {
        type : String,
        required: [true, "Content is required"],
        trim : true,
        minlength:[10, "Content must be 10 char atleast"],
    },
    askedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    tags:[
        {
            type:String,
            trim:true,
            lowercase:true
        },
    ],

    category:{
        type:String,
        enum:QUESTION_CATEGORY,
        default:"general"
    },

    views:{
        type:Number,
        default:0
    },
    upvotes:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],

    downvotes:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],

    isResolved:{
        type:Boolean,
        default:false
    },
    acceptAnswer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answer",
        default:null
    }

}, { timeseries: true});

questionSchema.virtual("voteCount").get(function () {
  return this.upvotes.length - this.downvotes.length;
});

questionSchema.index({ askedBy: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ category: 1 });
questionSchema.index({ createdAt: -1 });

questionSchema.set("toJSON", { virtuals: true });
questionSchema.set("toObject", { virtuals: true });

export const Question = mongoose.model("Question", questionSchema);