import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true,'title is required'],
      trim: true,
      maxlength: 120
    },

    description: {
      type: String,
      required: [true,'description is required'],
      trim: true
    },

    category: {
      type: String,
      required: [true,'category is required'],
      enum: ["kits", "medicine", "sports", "dress", "notes", "question", "other"]
    },

    urgency: {
      type: String,
      enum: ["normal", "urgent"],
      default: "normal"
    },

    image: {
      type: String // optional image url
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "fulfilled", "expired"],
      default: "open"
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    locationHint: {
      type: String,
      trim: true
    },

    contactPreference: {
      type: String,
      enum: ["chat", "call"],
      default: "chat"
    },

    expiresAt: {
      type: Date,
      required: [true,'expiryTime is required']
    }
  },
  {
    timestamps: true
  }
);

//  Indexes for performance
requestSchema.index({ category: 1 });
requestSchema.index({ urgency: 1 });
requestSchema.index({ status: 1 });
requestSchema.index({ createdAt: -1 });

//  Auto-expire logic helper
requestSchema.methods.isExpired = function () {
  return new Date() > this.expiresAt;
};


requestSchema.plugin(mongooseAggregatePaginate);
export const Request = mongoose.model("Request", requestSchema);
