import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [5, "Title must be at least 5 characters"],
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"]
  },
  category: {
    type: String,
    enum: ["Academic", "Technical", "General", "Hostel", "Campus", "Other"],
    default: "General"
  },
  urgency: {
    type: String,
    enum: ["Normal", "Urgent"],
    default: "Normal"
  },
  image: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["Open", "In-Progress", "Fulfilled", "Expired"],
    default: "Open"
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
  contact: {
    type: String,
    enum: ["CHAT", "CALL"],
    default: "CHAT"
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Auto expire after 2 days
      return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    }
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
requestSchema.index({ status: 1, createdAt: -1 });
requestSchema.index({ requestedBy: 1 });
requestSchema.index({ category: 1 });

// Auto-expire middleware
requestSchema.pre("find", function() {
  // Update expired requests
  this.where("expiresAt").lt(new Date()).where("status").ne("Expired");
});

export const Request = mongoose.model("Request", requestSchema);