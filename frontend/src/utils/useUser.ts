import { hydrateAuth } from '@/store/auth.store';
import { getUser } from './getUser';

export const useUser = () => {
	const user = getUser();
	hydrateAuth();
	if (user!) {
		return user;
	}
	return null;
};
