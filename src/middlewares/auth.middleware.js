import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/**
 *  Strict Auth Middleware
 * Blocks request if token is missing or invalid
 */
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized request");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const user = await User.findById(decoded._id)
    .select("-password -refreshToken");

  if (!user || !user.isActive) {
    throw new ApiError(403, "User not found or inactive");
  }

  req.user = user;
  req.userId = user._id;

  next();
});


/**
 *  Optional Auth Middleware
 * Does NOT block request if token is missing/invalid
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.replace("Bearer ", "").trim();
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded._id)
        .select("-password -refreshToken");

      if (user && user.isActive) {
        req.user = user;
        req.userId = user._id;
      }
    } catch (error) {
      // silently ignore auth errors
    }
  }

  next();
});
