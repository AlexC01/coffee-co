'use client';

import Image from 'next/image';
import useCartItemsSortPrice from '@/app/hooks/useCartItemsSortPrice';
import { useCartStore } from '@/app/lib/store/useCartStore';

const CheckoutSummary = () => {
	const { items, isInitialized } = useCartStore();
	const { sortedCarItems, subTotal } = useCartItemsSortPrice();

	if (Object.keys(items).length === 0 && isInitialized) {
		return null;
	}

	const transformColorName = (value: string) => {
		return value
			.split('-')
			.map((item) => {
				const firstLetter = item[0].toUpperCase();
				return `${firstLetter}${item.slice(1)}`;
			})
			.join(' ');
	};

	return (
		<div className="w-full bg-white shadow-md rounded-md p-5 mt-8 lg:mt-0">
			<h2 className="text-2xl font-bold text-center mt-3">Checkout Summary</h2>
			<div className="mt-8">
				{sortedCarItems.map(([id, product]) => {
					return (
						<div
							key={id}
							className="flex justify-between items-center flex-wrap mb-7"
						>
							<div className="flex items-center gap-2">
								<div className="relative">
									<Image
										src={product.image}
										alt="Mug Image"
										width={70}
										height={70}
										className="rounded-md"
									/>
									<span className="bg-gray-600 text-white text-xs rounded-full text-center px-2 py-1 font-bold absolute -top-3 -right-3">
										{product.quantity}
									</span>
								</div>
								<div className="flex flex-col">
									<h4 className="text-sm font-semibold mb-1">{product.name}</h4>
									<span className="text-xs text-gray-500">
										{product.size} / {transformColorName(product.color)}
									</span>
									<span className="text-xs font-medium text-gray-500 mt-1">
										(${product.price.toFixed(2)} / unit)
									</span>
								</div>
							</div>
							<h4 className="text-sm font-medium text-gray-700">
								${(product.price * product.quantity).toFixed(2)}
							</h4>
						</div>
					);
				})}
			</div>
			<hr className="mt-4 opacity-30" />
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
		</div>
	);
};

export default CheckoutSummary;
