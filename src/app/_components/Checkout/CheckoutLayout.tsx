'use client';
import Link from 'next/link';
import { routes } from '@/app/lib/models/Routes';
import { useAuthStore } from '@/app/lib/store/authStore';
import { useCartStore } from '@/app/lib/store/useCartStore';
import LoadingSpinner from '../LoadingSpinner';
import CheckoutPage from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';

const CheckoutLayout = () => {
	const { items, isInitialized } = useCartStore();
	const { user } = useAuthStore();

	if (Object.keys(items).length === 0 && isInitialized && user) {
		return (
			<div className="col-span-3 w-full">
				<div className="bg-white shadow-md mb-4 px-4 py-8 flex flex-col items-center justify-center rounded-md">
					<h2 className="text-center font-semibold text-2xl">
						In order to add items to your cart you can go to our products
						section
					</h2>
					<Link
						href={routes.products}
						className="inline-block mt-8 bg-accent-500 rounded-full text-center text-white text-lg px-8 py-3 font-bold shadow-lg hover:bg-accent-600 transition duration-300"
					>
						Shop the Collection
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			{!isInitialized && (
				<div className="flex items-center justify-center flex-col mt-10">
					<LoadingSpinner size="w-24 h-24" />
					<h4 className="mt-3 font-semibold text-lg">Loading items...</h4>
				</div>
			)}
			{isInitialized && (
				<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-5 items-start">
					<CheckoutPage />
					<CheckoutSummary />
				</div>
			)}
		</>
	);
};

export default CheckoutLayout;
