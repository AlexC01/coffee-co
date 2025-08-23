import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthListener from './_components/AuthListener';
import Footer from './_components/Footer/Footer';
import Navbar from './_components/Navbar/Navbar';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Toaster
					position="top-center"
					toastOptions={{ style: { marginTop: '60px' } }}
				/>
				<AuthListener>
					<Navbar />
					<main className="min-h-screen ">{children}</main>
					<Footer />
				</AuthListener>
			</body>
		</html>
	);
}
