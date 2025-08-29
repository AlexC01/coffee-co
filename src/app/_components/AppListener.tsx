'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { auth } from '../lib/firebase';
import type { CartItems } from '../lib/models/Cart';
import { useAuthStore } from '../lib/store/authStore';
import { useCartStore } from '../lib/store/useCartStore';

interface AppListenerProps {
	serverUser: any;
	serverCart: CartItems | null;
}

const AppListener = ({ serverUser, serverCart }: AppListenerProps) => {
	const { subscribeToCart, setCart, clearCart } = useCartStore();
	const { setUser, initializeUser } = useAuthStore();
	const isHydrated = useRef(false);

	useEffect(() => {
		if (!isHydrated.current) {
			initializeUser(serverUser);
			if (serverCart) setCart(serverCart);

			isHydrated.current = true;
		}
	}, [serverUser, initializeUser, serverCart, setCart]);

	useEffect(() => {
		let cartUnsubscribe: (() => void) | undefined;
		const authUnsubscribe = onAuthStateChanged(auth, (user) => {
			if (cartUnsubscribe) cartUnsubscribe();

			if (user) {
				setUser(user);
				cartUnsubscribe = subscribeToCart(user.uid);
			} else {
				setUser(null);
				clearCart();
			}
		});

		return () => {
			authUnsubscribe();
			if (cartUnsubscribe) cartUnsubscribe();
		};
	}, [setUser, subscribeToCart, clearCart]);

	// const user = useAuthStore((state) => state.user);

	// useEffect(() => {
	// 	let cartUnsubscribe: (() => void) | undefined;

	// 	if (user) cartUnsubscribe = subscribeToCart(user.uid);

	// 	return () => {
	// 		if (cartUnsubscribe) cartUnsubscribe();
	// 	};
	// }, [user, subscribeToCart]);

	return null;
};

export default AppListener;
