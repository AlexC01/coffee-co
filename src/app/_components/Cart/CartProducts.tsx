'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useCartItemsSortPrice from '@/app/hooks/useCartItemsSortPrice';
import type { CartItem } from '@/app/lib/models/Cart';
import { routes } from '@/app/lib/models/Routes';
import {
	addProductToCart,
	removeProductFromCart,
} from '@/app/lib/services/cartService';
import { useAuthStore } from '@/app/lib/store/authStore';
import { useCartStore } from '@/app/lib/store/useCartStore';
import LoadingSpinner from '../LoadingSpinner';

const CartProducts = () => {
	const { user } = useAuthStore();
	const { items, isInitialized } = useCartStore();
	const [loading, setLoading] = useState(false);
	const { sortedCarItems } = useCartItemsSortPrice();

	const handleAddToCart = async (item: CartItem, idProd: string) => {
		if (!user) return;
		setLoading(true);

		try {
			await addProductToCart(item, idProd, user.uid);
			toast.success('Product added to cart');
		} catch (err) {
			toast.error('Error while adding product to the cart');
		} finally {
			setLoading(false);
		}
	};

	const handleRemoveFromCart = async (
		idProd: string,
		deleteProduct?: boolean,
	) => {
		if (!user) return;
		setLoading(true);

		try {
			await removeProductFromCart(idProd, user.uid, deleteProduct);
			toast.success('Product removed from cart');
		} catch (err) {
			toast.error('Error while removing product to the cart');
		} finally {
			setLoading(false);
		}
	};

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
		<div className="lg:col-span-2 w-full">
			{!isInitialized && (
				<div className="flex items-center justify-center flex-col">
					<LoadingSpinner size="w-12 h-12" />
					<h4 className="mt-3 font-semibold text-lg">Loading items...</h4>
				</div>
			)}
			{sortedCarItems.map(([id, product]) => {
				return (
					<div
						className="bg-white shadow-md mb-4 p-4 flex items-center justify-between flex-wrap rounded-md"
						key={id}
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
								<Link href={`${routes.products}/${product.slug}`}>
									<h2 className="text-md font-semibold hover:text-gray-500 transition-colors duration-200">
										{product.name}
									</h2>
								</Link>
								<span className="text-sm font-medium text-gray-500">
									Size: {product.size}
								</span>
								<span className="text-sm font-medium text-gray-500">
									Color: {transformColorName(product.color)}
								</span>
								<span className="text-xs font-medium text-gray-500 mt-1">
									(${product.price.toFixed(2)} / unit)
								</span>
							</div>
						</div>
						<div className="flex flex-row items-center gap-4">
							<button
								type="button"
								disabled={loading}
								onClick={() =>
									handleRemoveFromCart(id, product.quantity - 1 <= 0)
								}
								className="rounded-full bg-gray-200 p-1 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
							>
								<Minus size={17} />
							</button>
							<span className="font-semibold text-lg">{product.quantity}</span>
							<button
								type="button"
								disabled={loading}
								onClick={() => handleAddToCart(product, id)}
								className="rounded-full bg-gray-200 p-1 cursor-pointer hover:bg-gray-300 transition-colors duration-200"
							>
								<Plus size={16} />
							</button>
						</div>
						<div className="flex items-center gap-4">
							<h4 className="font-bold text-lg">
								${(product.price * product.quantity).toFixed(2)}
							</h4>
							<button
								type="button"
								disabled={loading}
								onClick={() => handleRemoveFromCart(id, true)}
								className="-mt-1 border  rounded-full p-1 cursor-pointer hover:bg-red-200 text-red-500 transition-colors duration-200"
							>
								<Trash2 size={15} />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CartProducts;
