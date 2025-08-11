'use client';
import { use, useState } from 'react';
import type { ProductInterface } from '@/app/lib/models/Products';
import Card from '../Card/Card';

interface HomeCardsProps {
	featuredProd: Promise<ProductInterface[]>;
}

const HomeCards = ({ featuredProd }: HomeCardsProps) => {
	const featuredProducts = use(featuredProd);

	if (featuredProducts.length === 0) null;

	return (
		<>
			{featuredProducts.map((product) => (
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
