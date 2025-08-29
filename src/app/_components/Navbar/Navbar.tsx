/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';
import { signOut } from 'firebase/auth';
import { Menu, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '@/app/lib/firebase';
import type { CartItems } from '@/app/lib/models/Cart';
import { routes } from '@/app/lib/models/Routes';
import { useAuthStore } from '@/app/lib/store/authStore';
import { useCartStore } from '@/app/lib/store/useCartStore';

const Navbar = ({
	user: initialUser,
	cartItems: initialCartItems,
}: {
	user: any | null;
	cartItems: CartItems | null;
}) => {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState(initialUser);
	const { user: storeUser } = useAuthStore();
	const [currentCart, setCurrentCart] = useState(initialCartItems || {});
	const { items: storeCartItems } = useCartStore();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropDown = () => setIsDropdownOpen(!isDropdownOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [loadingOut, setLoadingOut] = useState(false);

	const handleSignOut = async () => {
		setLoadingOut(true);
		try {
			await signOut(auth);
			await fetch('/api/sessionLogout', { method: 'POST' });
			toast.success('Logged out successfully');
			router.push(routes.account);
		} catch (err) {
			toast.error('Error loging out, please try again');
		} finally {
			setLoadingOut(false);
			setIsMenuOpen(false);
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [dropdownRef]);

	useEffect(() => setCurrentUser(storeUser), [storeUser]);
	useEffect(() => setCurrentCart(storeCartItems), [storeCartItems]);

	const totalQuantity = useMemo(() => {
		if (!currentCart) return 0;

		return Object.values(currentCart).reduce(
			(total, item) => total + item.quantity,
			0,
		);
	}, [currentCart]);

	return (
		<nav
			className="fixed top-0 left-0 z-50 bg-white w-full  shadow-sm backdrop-blur-sm"
			ref={dropdownRef}
		>
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
						<Link
							href={currentUser ? routes.cart : routes.account}
							className="text-gray-700 hover:text-accent-500 transition delay-50 relative"
						>
							<ShoppingCart size={32} strokeWidth={1.5} />
							{totalQuantity > 0 && (
								<div className=" bg-accent-500 rounded-full text-center text-xs absolute -top-3 -right-3 px-2 py-1 text-white font-bold">
									<span>{totalQuantity}</span>
								</div>
							)}
						</Link>
						{!currentUser && (
							<Link
								href={routes.account}
								className="text-gray-700 hover:text-accent-500 transition delay-50 "
							>
								<User strokeWidth={1.5} size={32} />
							</Link>
						)}
						{currentUser && (
							<div className="relative inline-flex">
								<span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
									<button
										type="button"
										onClick={toggleDropDown}
										className="px-3 py-2 text-md font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative cursor-pointer"
									>
										Account
									</button>
									<button
										aria-label="menu"
										type="button"
										onClick={toggleDropDown}
										className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="size-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m19.5 8.25-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</button>
								</span>
								<div
									className={`${isDropdownOpen ? 'block' : 'hidden'} absolute end-0 top-12 z-auto w-42 overflow-hidden rounded border border-gray-300 bg-white shadow-sm`}
								>
									<Link
										href={routes.home}
										className="block px-3 py-2 text-sm  text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 font-semibold"
									>
										Orders
									</Link>
									<Link
										href={routes.home}
										className="block px-3 py-2 text-sm  text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 font-semibold"
									>
										Wishlist
									</Link>
									<button
										type="button"
										onClick={handleSignOut}
										disabled={loadingOut}
										className=" w-full flex justify-between items-center px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 cursor-pointer"
									>
										<span>Log Out</span>
										{loadingOut && (
											<div className="size-4 animate-spin border-b-2 border-red-500 rounded-full" />
										)}
									</button>
								</div>
							</div>
						)}
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
						<Link
							href={routes.cart}
							className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors mb-2 relative"
						>
							Cart
							{totalQuantity > 0 && (
								<div className=" bg-accent-500 rounded-full text-center text-xs absolute -top-3 left-9 px-2 py-1 text-white font-bold">
									<span>{totalQuantity}</span>
								</div>
							)}
						</Link>
						{!currentUser && (
							<Link
								href={routes.account}
								className="text-gray-900 block rounded-lg px-3 py-2 text-base font-medium hover:bg-gray-100 transition-colors"
							>
								Login
							</Link>
						)}
						{currentUser && (
							<div className="relative inline-flex ml-2">
								<span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
									<button
										type="button"
										onClick={toggleDropDown}
										className="px-3 py-2 text-md font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative cursor-pointer"
									>
										Account
									</button>
									<button
										aria-label="menu"
										type="button"
										onClick={toggleDropDown}
										className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="size-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m19.5 8.25-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</button>
								</span>
								<div
									className={`${isDropdownOpen ? 'block' : 'hidden'} absolute top-12 z-auto w-42 overflow-hidden rounded border border-gray-300 bg-white shadow-sm`}
								>
									<Link
										href={routes.home}
										className="block px-3 py-2 text-sm  text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 font-semibold"
									>
										Orders
									</Link>
									<Link
										href={routes.home}
										className="block px-3 py-2 text-sm  text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 font-semibold"
									>
										Wishlist
									</Link>
									<button
										type="button"
										onClick={handleSignOut}
										disabled={loadingOut}
										className=" w-full flex justify-between items-center px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 cursor-pointer"
									>
										<span>Log Out</span>
										{loadingOut && (
											<div className="size-4 animate-spin border-b-2 border-red-500 rounded-full" />
										)}
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
