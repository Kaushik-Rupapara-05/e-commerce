// Storage Keys
export const STORAGE_KEYS = {
  CURRENT_USER: "coffee_shop_current_user",
  USERS: "coffee_shop_users",
  PRODUCTS: "coffee_shop_products",
};

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "https://fakestoreapi.com/products",
  PRODUCT_BY_ID: (id) => `https://fakestoreapi.com/products/${id}`,
  CATEGORIES: "https://fakestoreapi.com/products/categories",
};

// Routes
export const ROUTES = {
  HOME: "home",
  LOGIN: "login",
  SIGNUP: "signup",
  PRODUCTS: "products",
};

// Form Validation
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  INVALID_CREDENTIALS: "Invalid username or password.",
  USER_EXISTS: "User already exists.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNAUTHORIZED: "You must be logged in to access this page.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
};
