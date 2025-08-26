'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from '@/app/lib/models/Routes';
import { useAuthStore } from '@/app/lib/store/authStore';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
	children: React.ReactNode;
	fallbackRoute?: string;
}

const ProtectedRoute = ({
	children,
	fallbackRoute = routes.account,
}: ProtectedRouteProps) => {
	const { user, loading } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) router.replace(fallbackRoute);
	}, [user, loading, router, fallbackRoute]);

	if (loading) return <LoadingSpinner />;

	if (!user) return <LoadingSpinner />;

	return <>{children}</>;
};

export default ProtectedRoute;
