'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import useCartItemsSortPrice from '@/app/hooks/useCartItemsSortPrice';
import { routes } from '@/app/lib/models/Routes';
import { useCartStore } from '@/app/lib/store/useCartStore';

const CartSummary = () => {
	const { items, isInitialized } = useCartStore();
	const { subTotal } = useCartItemsSortPrice();

	if (Object.keys(items).length === 0 && isInitialized) {
		return null;
	}

	return (
		<div className="w-full bg-white shadow-md rounded-md p-5 mt-8 lg:mt-0">
			<h2 className="text-2xl font-bold text-center mt-3">Order Summary</h2>
			<div className="flex justify-between items-center mt-8">
				<p className="font-medium text-lg">Subtotal</p>
				<p>${subTotal.toFixed(2)}</p>
			</div>
			<div className="flex justify-between items-center mt-8">
				<p className="font-medium text-lg">Shipping</p>
				<p>$5.00</p>
			</div>
			<hr className="mt-4 opacity-30" />
			<div className="flex justify-between items-center mt-8">
				<p className="font-bold text-lg">Total</p>
				<p className="font-bold">${(subTotal + 5).toFixed(2)}</p>
			</div>

			<div className="mt-8">
				<Link
					href={routes.checkout}
					className="flex items-center justify-center gap-2 w-full bg-accent-500 rounded-md shadow-md uppercase text-white font-bold p-3 hover:bg-accent-600 hover:shadow-sm transition-colors duration-200 cursor-pointer"
				>
					Proceed to Checkout
					<ShoppingBag size={20} className="-mt-1" />
				</Link>
			</div>
		</div>
	);
};

export default CartSummary;
