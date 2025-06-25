import { getAuthToken } from '../auth/loginApi';
import { get } from '../apiHandler';
import { apiError } from '../apiError';

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

export const fetchMe = async (): Promise<User> => {
    const token = getAuthToken();
    if (!token) {
        throw new apiError('No authentication token found.', 401);
    }
    try {
        const data = await get<UserResponse>({
            url: '/api/users/me',
            fetchOptions: {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            },
        });
        return data.data;
    } catch (error) {
        if (error instanceof apiError) {
            throw error;
        }
        throw new apiError('An unexpected error occurred while fetching user details.', 500);
    }
}; 