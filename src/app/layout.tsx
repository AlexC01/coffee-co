import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';
import AppListener from './_components/AppListener';
import Footer from './_components/Footer/Footer';
import Navbar from './_components/Navbar/Navbar';
import { adminAuth } from './lib/firebaseAdmin';
import { getCart } from './lib/services/cartService';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Coffee Co',
	description: 'Ecommerce for Coffee Co.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get('__session')?.value;
	let user = null;
	let cart = null;

	if (sessionCookie) {
		try {
			const decodedClaims = await adminAuth.verifySessionCookie(
				sessionCookie,
				true,
			);
			user = decodedClaims;

			const userCart = await getCart(user.uid);
			if (userCart) cart = userCart.items;
		} catch (err) {
			user = null;
		}
	}

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppListener serverUser={user} serverCart={cart} />
				<Toaster
					position="top-center"
					toastOptions={{ style: { marginTop: '60px' } }}
				/>
				<Navbar user={user} cartItems={cart} />
				<main className="min-h-screen ">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
