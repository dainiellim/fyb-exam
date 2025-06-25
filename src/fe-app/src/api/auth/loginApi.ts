import { ApiError } from '../ApiError';

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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'Login failed', response.status);
    }

    if (data.token) {
      sessionStorage.setItem('authToken', data.token);
    }

    return {
      success: true,
      message: data.message || 'Login successful',
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError('An unexpected error occurred. Please check your network connection.', 500);
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