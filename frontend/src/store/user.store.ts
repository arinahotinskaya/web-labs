import { User } from 'src/types/user.interfaces';
import { create } from 'zustand';
import http from '../api/base-api';

export interface UserStore {
	user: User | null;

	status: 'logged in' | 'logged out';
}

const userStore = create<UserStore>((set) => ({
	user: null,
	status: 'logged out',
}));

export default userStore;
