import ApiError from "../utils/ApiError.js";

/**
 * Admin-only access middleware
 * Assumes req.user is populated by verifyJWT
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  // Adjust role logic if needed
  if (req.user.role !== "admin") {
    return next(new ApiError(403, "Admin access only"));
  }

  next();
};

export { isAdmin };
