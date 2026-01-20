import mongoose from "mongoose";

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
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
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

export const Response = mongoose.model('Response', responseSchema);