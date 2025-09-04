'use client';

import { Bookmark, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { CartItem } from '@/app/lib/models/Cart';
import type { ProductInterface } from '@/app/lib/models/Products';
import { addProductToCart } from '@/app/lib/services/cartService';
import { useAuthStore } from '@/app/lib/store/authStore';
import ColorSelector from '../Card/ColorSelector';
import SelectField from '../Inputs/SelectField';
import LoadingSpinner from '../LoadingSpinner';
import Images from './Images';
import StarRating from './StarRating';

interface ProductDetailProps {
	product: ProductInterface;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
	const { user } = useAuthStore();
	const [optionSelected, setOptionSelected] = useState(0);
	const changeOptionSelected = (option: number) => setOptionSelected(option);
	const [sizeSelected, setSizeSelected] = useState('');
	const updateSizeSelected = (value: string) => setSizeSelected(value);
	const [loading, setLoading] = useState(false);

	const handleAddToCart = async () => {
		if (!user) return;
		setLoading(true);
		const idProd = `${product.id}::${sizeSelected.toLowerCase().split(' ').join('')}::${product.colors[optionSelected]}`;
		const itemData: CartItem = {
			color: product.colors[optionSelected],
			image: product.images[optionSelected],
			size: sizeSelected,
			price: product.price,
			quantity: 1,
			name: product.name,
			slug: product.slug,
		};

		try {
			await addProductToCart(itemData, idProd, user.uid);
			toast.success('Product added to cart');
		} catch (err) {
			toast.error('Error while adding product to the cart');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="flex flex-col md:flex-row  justify-between gap-12">
			<div className="relative w-full md:w-2/5 mx-auto flex flex-col">
				<div className="relative w-full  aspect-square rounded-lg shadow-md overflow-hidden">
					<Image
						src={product.images[optionSelected]}
						alt="Mugs"
						fill
						className="object-cover"
						priority
					/>
				</div>
				<div className="mt-3">
					<Images
						imagesArray={product.images}
						imageSelected={optionSelected}
						updateImageSelected={changeOptionSelected}
					/>
				</div>
			</div>
			<div className="md:w-1/2 text-center sm:text-left">
				<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
					{product.name}
				</h2>
				<div>
					<StarRating rating={4} />
				</div>
				<hr className="mt-2 text-gray-400" />
				<span className="block font-semibold text-gray-500 text-lg sm:text-3xl mt-4">
					${Number(product.price).toFixed(2)}
				</span>
				<div className="mt-2">
					<ColorSelector
						colors={product.colors}
						changeSelected={(value: number) => setOptionSelected(value)}
						selected={optionSelected}
						bigger
					/>
				</div>
				<p className="text-lg text-gray-600 max-w-lg mx-auto sm:mx-0  mt-7">
					{product.description}
				</p>
				<div className="mt-8 w-1/4">
					<SelectField
						value={sizeSelected}
						options={product.sizes.map((size) => {
							return { value: size, label: size };
						})}
						onChange={updateSizeSelected}
						placeholder="Size"
					/>
				</div>
				<div className="flex items-center mt-10 gap-5 flex-col sm:flex-row">
					<button
						type="button"
						onClick={handleAddToCart}
						disabled={sizeSelected === '' || loading || !user}
						className={`flex items-center gap-3 pl-5 pr-4 py-4 ${sizeSelected === '' || loading || !user ? 'bg-accent-500 opacity-60 cursor-not-allowed' : 'bg-accent-500 cursor-pointer'}  text-white font-bold uppercase shadow-lg transition-all hover:shadow-sm rounded-md`}
					>
						<ShoppingCart size={25} strokeWidth={1.5} />
						Add to Cart
						{loading && <LoadingSpinner />}
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetail;
