export const DB_NAME = "HelpYourBuddy"

export const TEMP_UPLOAD_DIR = "public/temp";

// request categories
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


// urcency level
export const URGENCY_LEVELS = [
    "normal",
    "urgent",
    "critical"
];

export const REPORT_STATUS = [
    "pending",
    "reviewed",
    "resolved",
    "dismissed"
]

exports.REQUEST_STATUS = [
  'open',
  'in-progress',
  'fulfilled',
  'expired',
  'cancelled'
];

// request status
export const RESPONSE_STATUS = [
    "pending",
    "accepted",
    "rejected"
];



export const NOTIFICATION_TYPES = [
    "new_response",
    "response_accepted",
    "response_rejected",
    "reuest_fullfilled",
    "new_message",
    "system"
];

export const REPORT_REASON = [
    "spam",
    "harassment",
    "inappropriate_content",
    "fraud",
    "fake_request",
    "other"
];

export const USER_ROLE = {
    USER: "user",
    ADMIN: "admin",
    MODERATOR: "moderator"
};

export const CONTACT_OPTION = [
    "chat",
    "call"
];


export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const MAX_FILE_SIZE = 5*1024*1024;
export const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
];

export const MAX_CHAT_LENGTH = 1000;

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1000;
