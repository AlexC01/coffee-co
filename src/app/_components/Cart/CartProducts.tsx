'use client';

import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/app/lib/store/useCartStore';
import LoadingSpinner from '../LoadingSpinner';

const CartProducts = () => {
	const { items, isInitialized } = useCartStore();

	if (Object.keys(items).length === 0 && isInitialized) {
		return (
			<h2 className="text-center font-bold text-2xl">
				There is no items in your cart
			</h2>
		);
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
		<div className="col-span-2 w-full">
			{!isInitialized && (
				<div className="flex items-center justify-center flex-col">
					<LoadingSpinner size="w-12 h-12" />
					<h4 className="mt-3 font-semibold text-lg">Loading items...</h4>
				</div>
			)}
			{Object.keys(items).map((productKey) => {
				const product = items[productKey];

				return (
					<div
						className="bg-white shadow-md mb-4 p-4 flex items-center justify-between rounded-md"
						key={productKey}
					>
						<div className="flex items-center gap-6">
							<Image
								src={product.image}
								alt="Mug Image"
								width={120}
								height={120}
								className="rounded-md"
							/>
							<div className="flex flex-col">
								<h2 className="text-md font-semibold">{product.name}</h2>
								<span className="text-sm font-medium text-gray-500">
									Size: {product.size}
								</span>
								<span className="text-sm font-medium text-gray-500">
									Color: {transformColorName(product.color)}
								</span>
							</div>
						</div>
						<div className="flex flex-row items-center gap-4">
							<button
								type="button"
								className="rounded-full bg-gray-200 p-1 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
							>
								<Minus size={17} />
							</button>
							<span className="font-semibold text-lg">{product.quantity}</span>
							<button
								type="button"
								className="rounded-full bg-gray-200 p-1 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
							>
								<Plus size={16} />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CartProducts;
