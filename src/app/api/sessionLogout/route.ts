import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
	const serializedCookie = serialize('__session', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(0),
		path: '/',
	});

	const response = NextResponse.json({ success: true });
	response.headers.set('Set-Cookie', serializedCookie);
	return response;
}
