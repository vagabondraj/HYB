import mongoose from "mongoose";
import {
  RESPONSE_STATUS
} from "../constants.js";

const responseSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  responder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Response message is required'],
    trim: true,
    minlength: [5, 'Message must be at least 5 characters']
  },
  status: {
    type: String,
    enum: RESPONSE_STATUS,
    default: 'pending'
  },
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Prevent duplicate responses from same user to same request
responseSchema.index({ request: 1, responder: 1 }, { unique: true });
responseSchema.index({request : 1, status : 1});
responseSchema.index({responder: 1});

export const Response = mongoose.model('Response', responseSchema);