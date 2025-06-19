import { create } from 'zustand';
import { getToken } from '../utils/getToken';
import { User } from 'src/types/user.interfaces';
import { getUser } from '../utils/getUser';
import { removeItemStorage, setItemStorage } from '../utils/setItemStorage';

interface AuthStateType {
	status: 'idle' | 'signOut' | 'signIn';
	token: string | null;
	user: User | null;

	signIn: (token: string, user: User) => void;
	signOut: () => void;
	hydrate: () => void;
}

export const useAuth = create<AuthStateType>((set, get) => ({
	status: 'idle',
	token: null,
	user: null,

	signIn: (token, user) => {
		set({ status: 'signIn', token: token, user: user });
		setItemStorage('token', token);
		setItemStorage('user', user);
	},

	signOut: () => {
		set({ status: 'signOut', token: null, user: null });
		removeItemStorage('token');
		removeItemStorage('user');
	},

	hydrate: () => {
		const token = getToken();
		const user = getUser();

		if (token !== null && user !== null) {
			get().signIn(token, user);
		} else {
			get().signOut();
		}
	},
}));

export const hydrateAuth = () => useAuth.getState().hydrate();
