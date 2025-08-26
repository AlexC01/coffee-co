'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '@/app/lib/firebase';
import { useAuthStore } from '../lib/store/authStore';

const AuthListener = () => {
	const setUser = useAuthStore((state) => state.setUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, [setUser]);

	return null;
};

export default AuthListener;
