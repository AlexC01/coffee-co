import { serialize } from 'cookie';
import { type NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebaseAdmin';

export const POST = async (req: NextRequest) => {
	const { idToken } = await req.json();

	try {
		await adminAuth.verifyIdToken(idToken);

		const sessionCookie = await adminAuth.createSessionCookie(idToken, {
			expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
		});

		const serializedCookie = serialize('__session', sessionCookie, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 5,
			path: '/',
			sameSite: 'strict',
		});

		const response = NextResponse.json({ success: true });
		response.headers.set('Set-Cookie', serializedCookie);
		return response;
	} catch (err) {
		console.error('Error creating session cookie', err);
		return NextResponse.json(
			{
				success: false,
				error: 'Authentication failed',
			},
			{ status: 401 },
		);
	}
};
