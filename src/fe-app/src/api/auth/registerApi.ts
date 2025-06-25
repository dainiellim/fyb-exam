import { ApiError } from '../ApiError';

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  password?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';

export const registerApi = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'Registration failed', response.status);
    }

    return {
      success: true,
      message: data.message || 'Registration successful',
      user: data.user,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError('An unexpected error occurred.', 500);
  }
};

export const validateRegistrationData = (data: { [key: string]: any }): string | null => {
  if (!data.email || !data.password || !data.confirmPassword) {
    return 'All fields are required';
  }

  if (data.password !== data.confirmPassword) {
    return 'Passwords do not match';
  }

  if (data.password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return 'Please enter a valid email address';
  }

  return null;
}; 