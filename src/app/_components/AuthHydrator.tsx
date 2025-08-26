'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/app/lib/store/authStore';

export default function AuthHydrator({ user }: { user: any | null }) {
	const isHydrated = useRef(false);

	useEffect(() => {
		if (!isHydrated.current) {
			useAuthStore.setState({ user });
			isHydrated.current = true;
		}
	}, [user]);

	return null;
}
