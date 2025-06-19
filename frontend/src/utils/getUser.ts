import { User } from 'src/types/user.interfaces';

export const getUser = (): User | null => {
	const user = JSON.parse(
		window.localStorage.getItem('user') || '{"user": ""}'
	);
	if (user.id) return user;

	return null;
};
