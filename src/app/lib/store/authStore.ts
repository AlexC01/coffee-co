import type { User } from 'firebase/auth';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface AuthState {
	user: User | null;
	isLoading: boolean;
	initializeUser: (user: User | null) => void;
	setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
	subscribeWithSelector(
		devtools((set) => ({
			user: null,
			isLoading: true,
			initializeUser: (user) => {
				set({ user, isLoading: false });
			},
			setUser: (user) => {
				set({ user });
			},
		})),
	),
);
