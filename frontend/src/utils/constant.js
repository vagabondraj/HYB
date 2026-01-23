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

export const API_ROUTE = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
    UPDATE_PROFILE: "/auth/update-profile",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  USER: {
    SEARCH: "/user/search",
    PROFILE: (userName) => `/user/profile/${userName}`,
    UPLOAD_AVATAR: "/user/avatar",
  },

  CHAT: {
    GET_MY_CHATS: "/chat",
    GET_CHAT_BY_ID: (chatId) => `/chat/${chatId}`,
    GET_MESSAGES: (chatId) => `/chat/${chatId}/messages`,
    SEND_MESSAGE: (chatId) => `/chat/${chatId}/messages`,
    DELETE_MESSAGE: (chatId, messageId) =>
      `/chat/${chatId}/messages/${messageId}`,
  },

  NOTIFICATIONS: {
    GET_MY: "/notifications",
    MARK_AS_READ: (notificationId) =>
      `/notifications/${notificationId}/read`,
    MARK_ALL_AS_READ: "/notifications/read-all",
    DELETE: (notificationId) =>
      `/notifications/${notificationId}`,
  },

   REQUESTS: {
    CREATE: "/requests/create-req",
    GET_ALL: "/requests/get-all-req",
    GET_BY_ID: (id) => `/requests/get-req-ById/${id}`,

    GET_MY: "/requests/get-my-req",
    ACCEPT: (id) => `/requests/accept-req/${id}`,
    UPDATE: (id) => `/requests/update-req/${id}`,
    CANCEL: (id) => `/requests/cancle-req/${id}`,
    FULFILL: (id) => `/requests/full-fill-req/${id}`,
    DELETE: (id) => `/requests/${id}`,
  },

  RESPONSES: {
    CREATE: "/responses/create-response",
    GET_MY: "/responses/get-my-res",
    GET_FOR_REQUEST: (requestId) =>
      `/responses/get-req-for-res/${requestId}`,
    ACCEPT: (id) => `/responses/${id}/accept`,
    REJECT: (id) => `/responses/${id}/reject`,
  },

  REPORTS: {
    CREATE: "/reports",
    GET_ALL: "/reports",
    UPDATE: (id) => `/reports/${id}`,
  },
};


