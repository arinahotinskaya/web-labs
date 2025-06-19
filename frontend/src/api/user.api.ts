import { User } from 'src/types/user.interfaces';
import http from './base-api';

export interface UserResponse {
	token: string;
	userData: User;
}

const logIn = async (
	login: string,
	password: string
): Promise<UserResponse> => {
	const user = await http.post<UserResponse>('/auth/signin', {
		email: login,
		password,
	});

	return user.data;
};

const register = async (
	login: string,
	password: string
): Promise<UserResponse> => {
	const user = await http.post<UserResponse>('/auth/signup', {
		email: login,
		password,
	});

	return user.data;
};

export const userApi = {
	logIn,
	register,
};
