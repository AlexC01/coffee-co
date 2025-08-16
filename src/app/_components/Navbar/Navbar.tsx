'use client';
import { Menu, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { routes } from '@/app/lib/models/Routes';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<nav className="fixed top-0 left-0 z-50 bg-white w-full  shadow-sm backdrop-blur-sm">
			<div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center  h-16">
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="text-2xl font-bold">
							Coffee Co.
						</Link>
					</div>
					<div className="hidden md:flex md:items-center text-lg justify-center md:space-x-6 font-semibold text-gray-700">
						<Link
							href={routes.home}
							className="rounded-sm   hover:text-accent-500 transition delay-50"
						>
							Home
						</Link>
						<Link
							href={routes.products}
							className="rounded-sm   hover:text-accent-500 transition delay-50"
						>
							Products
						</Link>
						<Link
							href={routes.about_us}
							className="rounded-sm  hover:text-accent-500 transition delay-50"
						>
							About Us
						</Link>
						<a
							href={routes.contact}
							className="rounded-sm   hover:text-accent-500 transition delay-50"
						>
							Contact
						</a>
					</div>
					<div className="hidden md:flex md:items-center md:space-x-6">
						<a
							href="/"
							className="text-gray-700 hover:text-accent-500 transition delay-50"
						>
							<ShoppingCart size={32} strokeWidth={1.5} />
						</a>{' '}
						<a
							href="/"
							className="text-gray-700 hover:text-accent-500 transition delay-50 "
						>
							<User strokeWidth={1.5} size={32} />
						</a>
					</div>

					<div className="flex md:hidden">
						<button
							type="button"
							onClick={toggleMenu}
							aria-controls="mobile-menu"
							aria-expanded="false"
							className="inline-flex items-center justify-center p-2 rounded-lg text-gray-900 hover:text-accent-500 focus:outline-none focus:ring-inset focus:ring-white transition-colors cursor-pointer"
						>
							<span className="sr-only">Open Main Menu</span>
							<Menu strokeWidth={2} size={30} />
						</button>
					</div>
				</div>
			</div>
			<div
				className={`md:hidden absolute inset-x-0 top-16 bg-white shadow-lg transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
				id="mobile-menu"
			>
				<hr className=" opacity-10 " />
				<div className="pt-2 pb-3 space-y-1 sm:px-3">
					<Link
						href={routes.home}
						className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors"
					>
						Home
					</Link>
					<Link
						href={routes.products}
						className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors"
					>
						Products
					</Link>
					<Link
						href={routes.about_us}
						className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors"
					>
						About
					</Link>
					<div className="border-t border-gray-200 mt-2 pt-2">
						<a
							href="/"
							className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors"
						>
							Cart
						</a>
						<a
							href="/"
							className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors"
						>
							Login
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
