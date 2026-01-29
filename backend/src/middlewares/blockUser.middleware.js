import {User} from "../models/user.models.js";
import {ApiError} from "../utils/ApiError.js";


/**
 * Middleware to check if user is blocked
 * Use this on routes that should be restricted for blocked users
 */
const checkBlockedUser = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    
    if (!userId) {
      return next(new ApiError(401, 'Unauthorized: User not authenticated'));
    }

    const user = await User.findById(userId).select('isBlocked warningCount');
    
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: '🚫 Your account has been temporarily blocked due to repeated policy violations. You cannot perform this action.',
        isBlocked: true,
        warningCount: user.warningCount
      });
    }

    // User is not blocked, proceed to next middleware
    next();

  } catch (error) {
    console.error('[BlockUser Middleware] Error:', error);
    return next(new ApiError(500, 'Error checking user block status'));
  }
};

/**
 * Middleware that only warns but doesn't block
 * Useful for routes where you want to show a warning but still allow access
 */
const warnBlockedUser = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    
    if (!userId) {
      return next();
    }

    const user = await User.findById(userId).select('isBlocked warningCount');
    
    if (user?.isBlocked) {
      // Attach blocked status to request for controllers to use
      req.userBlocked = true;
      req.userWarningCount = user.warningCount;
    }

    next();

  } catch (error) {
    console.error('[BlockUser Middleware] Warning check error:', error);
    next(); // Continue even on error for non-critical routes
  }
};

/**
 * Helper function to check if user is blocked (for use in controllers)
 * @param {string} userId - The user's ID
 * @returns {Promise<{isBlocked: boolean, warningCount: number}>}
 */
const isUserBlocked = async (userId) => {
  try {
    const user = await User.findById(userId).select('isBlocked warningCount');
    
    if (!user) {
      return { isBlocked: false, warningCount: 0 };
    }

    return {
      isBlocked: user.isBlocked || false,
      warningCount: user.warningCount || 0
    };

  } catch (error) {
    console.error('[BlockUser Helper] Error:', error);
    return { isBlocked: false, warningCount: 0 };
  }
};

exports = {
  checkBlockedUser,
  warnBlockedUser,
  isUserBlocked
};
