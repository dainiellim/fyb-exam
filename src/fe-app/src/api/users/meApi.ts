import { getAuthToken } from '../auth/loginApi';
import { ApiError } from '../ApiError';

export interface User {
    id: string;
    email: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    last_logged_in: string;
    deleted_at: string | null;
}

export interface UserResponse {
    data: User;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';

export const fetchMe = async (): Promise<User> => {
    const token = getAuthToken();
    if (!token) {
        throw new ApiError('No authentication token found.', 401);
    }

    try {
        const response = await fetch(`${API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new ApiError(data.message || 'Failed to fetch user details', response.status);
        }

        const json: UserResponse = await response.json();
        return json.data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('An unexpected error occurred while fetching user details.', 500);
    }
}; 