import Link from 'next/link';
import { routes } from '@/app/lib/models/Routes';

const Footer = () => {
	return (
		<footer className="bg-white py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
				<div className="flex flex-col sm:flex-row sm:items-start justify-between items-center  space-y-8">
					<div className="flex flex-col space-y-2">
						<h4 className=" text-lg font-bold mb-3">Coffee Co.</h4>
						<Link
							href={routes.home}
							className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
						>
							Home
						</Link>
						<Link
							href={routes.products}
							className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
						>
							Products
						</Link>
						<Link
							href={routes.about_us}
							className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
						>
							About Us
						</Link>
					</div>
					<div className="flex flex-col items-center sm:items-start space-y-2">
						<h4 className="text-lg font-bold mb-3">Follow Us</h4>
						<div className="flex space-x-4">
							<Link
								href={routes.home}
								className="text-gray-600 hover:text-accent-500 transition-colors duration-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-instagram-icon lucide-instagram"
								>
									<title>Instagram</title>
									<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
								</svg>
							</Link>
							<Link
								href={routes.home}
								className='className="text-gray-600 hover:text-accent-500 transition-colors duration-200"'
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-facebook-icon lucide-facebook"
								>
									<title>Facebook</title>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-8 text-sm text-gray-500 text-center">
					&copy; 2025 Coffee Co. All Rights Reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
