'use client';
import { use, useState } from 'react';
import type { ProductInterface } from '@/app/lib/models/Products';
import Card from '../Card/Card';

interface HomeCardsProps {
	products: Promise<ProductInterface[]>;
}

const HomeCards = ({ products }: HomeCardsProps) => {
	const allProducts = use(products);
	return (
		<>
			{allProducts.map((product) => (
				<Card
					key={product.id}
					title={product.name}
					price={product.price.toString()}
					image={product.images[0]}
				/>
			))}
		</>
	);
};

export default HomeCards;
