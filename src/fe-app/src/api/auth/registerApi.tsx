import { post } from '../apiHandler';
import { apiError } from '../apiError';

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

export const registerApi = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const data = await post<RegisterResponse>({
      url: '/api/auth/register',
      payload: userData,
    });
    return data;
  } catch (error) {
    if (error instanceof apiError) {
      throw error;
    }
    throw new apiError('An unexpected error occurred.', 500);
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