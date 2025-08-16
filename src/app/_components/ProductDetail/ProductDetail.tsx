'use client';

import Image from 'next/image';
import type { ProductInterface } from '@/app/lib/models/Products';
import ColorSelector from '../Card/ColorSelector';
import Images from './Images';

interface ProductDetailProps {
	product: ProductInterface;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
	return (
		<section className="flex flex-col md:flex-row  justify-between gap-12">
			<div className="relative w-full md:w-2/5 mx-auto flex flex-col">
				<div className="relative w-full  aspect-square rounded-lg shadow-md overflow-hidden">
					<Image
						src={product.images[0]}
						alt="Mugs"
						fill
						className="object-cover"
						priority
					/>
				</div>
				<div className="mt-3">
					<Images imagesArray={product.images} />
				</div>
			</div>
			<div className="md:w-1/2 text-center md:text-left">
				<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
					{product.name}
				</h2>
				<hr className="mt-2 text-gray-400" />
				<span className="block font-semibold text-gray-500 text-lg md:text-3xl mt-4">
					${Number(product.price).toFixed(2)}
				</span>
				<div className="mt-2">
					<ColorSelector
						colors={product.colors}
						changeSelected={(value: number) => {}}
						selected={0}
					/>
				</div>
				<p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0 mt-8">
					{product.description}
				</p>
			</div>
		</section>
	);
};

export default ProductDetail;
