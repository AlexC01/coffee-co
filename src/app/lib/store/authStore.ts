import type { User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	loading: true,
	user: null,
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
}));
