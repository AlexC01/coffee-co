'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from '@/app/lib/models/Routes';
import { useAuthStore } from '@/app/lib/store/authStore';

interface ProtectedRouteProps {
	children: React.ReactNode;
	fallbackRoute?: string;
}

const ProtectedRoute = ({
	children,
	fallbackRoute = routes.account,
}: ProtectedRouteProps) => {
	const { user } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (user === null) router.replace(fallbackRoute);
	}, [user, router, fallbackRoute]);

	if (!user) return null;

	return <>{children}</>;
};

export default ProtectedRoute;
