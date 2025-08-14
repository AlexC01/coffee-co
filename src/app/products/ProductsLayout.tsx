'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import Card from '../_components/Card/Card';
import SkeletonCard from '../_components/Card/SkeletonCard';
import { ColorsInterfaceResponse } from '../lib/models/Colors';
import type {
	ProductInterface,
	ProductsFiltersInterface,
} from '../lib/models/Products';
import Filters from './_filter/Filters';
import TopFilters from './_filter/TopFilters';

interface ProductsLayoutProps {
	products: ProductInterface[];
	params: ProductsFiltersInterface;
	colors: ColorsInterfaceResponse[];
}

const ProductsLayout = ({ products, params, colors }: ProductsLayoutProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const updateParams = (option: string, value: string) => {
		startTransition(() => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === '') params.delete(option);
			else params.set(option, value);

			router.push(`?${params.toString()}`);
		});
	};

	useEffect(() => {
		console.log(params);
	}, [params]);

	return (
		<section className="mt-10 flex flex-grow flex-col md:grid md:grid-cols-3  gap-8">
			<Filters
				products={products}
				colors={colors}
				updateParams={updateParams}
			/>
			<div className="md:col-span-2">
				<TopFilters updateParams={updateParams} />
				{isPending && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<SkeletonCard />
						<SkeletonCard />
						<SkeletonCard />
						<SkeletonCard />
					</div>
				)}
				{!isPending && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{products.length === 0 ? (
							<h3 className="text-2xl font-semibold text-gray-500">
								No results found
							</h3>
						) : (
							products.map((product) => (
								<Card
									key={product.id}
									title={product.name}
									price={product.price.toString()}
									images={product.images}
									colors={product.colors}
									sizes={product.sizes}
								/>
							))
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductsLayout;
