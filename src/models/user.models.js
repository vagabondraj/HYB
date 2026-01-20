import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    userName: {
      type: String,
      required: [true, 'uaername is required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: 6,
      select: false
    },

    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true
    },

    year: {
      type: Number,
      required: [true, 'year is required'],
      min: 1,
      max: 6
    },

    hostel: {
      type: String,
      trim: true
    },

    avatar: {
      type: String // cloudinary url
    },

    helpCount: {
      type: Number,
      default: 0
    },

  
     //  REFERENCES (RELATIONS)
  

    requestsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
      }
    ],

    responsesGiven: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response"
      }
    ],

    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
      }
    ],


    refreshToken: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true
  }
);

///  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

///  Compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

///  Access Token (minimal)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

///  Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
