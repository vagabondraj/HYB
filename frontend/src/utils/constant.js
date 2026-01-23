export const DELETE_WINDOW_MINUTES = 5;
export const WINDOW_EXPIRY_TIME = DELETE_WINDOW_MINUTES * 60 * 1000; // 5 minutes

// ================================
// Request Categories 
// ================================
export const REQUEST_CATEGORIES = [
  "medicine",
  "notes",
  "sports",
  "stationary", 
  "electronics",
  "books",
  "food",
  "transport",
  "other"
];

// ================================
// Question Categories
// ================================
export const QUESTION_CATEGORY = [
  "academic",
  "technical",
  "general",
  "campus",
  "other"
];

// ================================
// Urgency Levels
// ================================
export const URGENCY_LEVELS = [
  "normal",
  "urgent",
  "critical"
];

// ================================
// Request / Response Status
// ================================
export const REQUEST_STATUS = [
  "open",
  "in-progress",
  "fulfilled",
  "expired",
  "cancelled"
];

export const RESPONSE_STATUS = [
  "pending",
  "accepted",
  "rejected"
];

// ================================
// Report System
// ================================
export const REPORT_STATUS = [
  "pending",
  "reviewed",
  "resolved",
  "dismissed"
];

export const REPORT_REASON = [
  "spam",
  "harassment",
  "inappropriate_content",
  "fraud",
  "fake_request",
  "abuse",
  "other"
];

// ================================
// Notifications (STRICT MATCH)
// ================================
export const NOTIFICATION_TYPES = [
  "new_response",
  "response_accepted",
  "response_rejected",
  "request_fullfilled", 
  "new_message",
  "system"
];

// ================================
// User / Roles
// ================================
export const USER_ROLE = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator"
};

// ================================
// Contact Options
// ================================
export const CONTACT_OPTION = [
  "chat",
  "call"
];

// ================================
// Pagination
// ================================
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ================================
// File Upload Constraints
// ================================
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp"
];

// ================================
// Validation Limits
// ================================
export const MAX_CHAT_LENGTH = 1000;
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1000;

// src/utils/constants.js

export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    UPDATE_PROFILE: "/auth/update-profile",
    CHANGE_PASSWORD: "/auth/change-password",
  },
};

