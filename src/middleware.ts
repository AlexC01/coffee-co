import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routes } from '@/app/lib/models/Routes';

const protectedRoutes: string[] = [];
const publicRoutes = [routes.account];

export const middleware = (request: NextRequest) => {
	const sessionToken = request.cookies.get('__session')?.value;
	const currentPath = request.nextUrl.pathname;

	if (sessionToken) {
		if (publicRoutes.includes(currentPath))
			return NextResponse.redirect(new URL('/', request.url));

		return NextResponse.next();
	}

	// if (protectedRoutes.includes(currentPath))
	// 	return NextResponse.redirect(new URL(routes.account, request.url));

	return NextResponse.next();
};

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
