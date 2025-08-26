import type { User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
