// Export all types and functions from login API
export {
  loginApi,
  isAuthenticated,
  getAuthToken,
  removeAuthToken,
  type LoginRequest,
  type LoginResponse,
} from './loginApi';

// Export all types and functions from register API
export {
  registerApi,
  validateRegistrationData,
  type RegisterRequest,
  type RegisterResponse,
} from './registerApi';

// Re-export common types
export type { ApiError } from './loginApi'; 