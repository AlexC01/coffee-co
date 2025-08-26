'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from '@/app/lib/models/Routes';
import { useAuthStore } from '@/app/lib/store/authStore';
import LoadingSpinner from './LoadingSpinner';

interface PublicRouteProps {
	children: React.ReactNode;
	redirectRoute?: string;
}

const PublicRoute = ({
	children,
	redirectRoute = routes.home,
}: PublicRouteProps) => {
	const { user, loading } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!loading && user) router.replace(redirectRoute);
	}, [user, loading, router, redirectRoute]);

	if (loading) return <LoadingSpinner />;

	if (user) return <LoadingSpinner />;

	return <>{children}</>;
};

export default PublicRoute;
