'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '@/app/lib/firebase';
import { useAuthStore } from '../lib/store/authStore';

const AuthListener = ({ children }: { children: React.ReactNode }) => {
	const setUser = useAuthStore((state) => state.setUser);
	const setLoading = useAuthStore((state) => state.setLoading);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, [setUser, setLoading]);

	return <>{children}</>;
};

export default AuthListener;
