'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from '@/app/lib/models/Routes';
import { useAuthStore } from '@/app/lib/store/authStore';

interface PublicRouteProps {
	children: React.ReactNode;
	redirectRoute?: string;
}

const PublicRoute = ({
	children,
	redirectRoute = routes.home,
}: PublicRouteProps) => {
	const { user } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (user) router.replace(redirectRoute);
	}, [user, router, redirectRoute]);

	if (user) return null;

	return <>{children}</>;
};

export default PublicRoute;
