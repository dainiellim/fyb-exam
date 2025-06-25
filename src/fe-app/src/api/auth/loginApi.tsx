import { post } from '../apiHandler';
import { apiError } from '../apiError';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const data = await post<LoginResponse>({
      url: '/api/auth/login',
      payload: credentials,
    });
    if (data.token) {
      sessionStorage.setItem('authToken', data.token);
    }
    return data;
  } catch (error) {
    if (error instanceof apiError) {
      throw error;
    }
    throw new apiError('An unexpected error occurred. Please check your network connection.', 500);
  }
};

export const isAuthenticated = (): boolean => {
  return !!sessionStorage.getItem('authToken');
};

export const getAuthToken = (): string | null => {
  return sessionStorage.getItem('authToken');
};

export const removeAuthToken = (): void => {
  sessionStorage.removeItem('authToken');
}; 