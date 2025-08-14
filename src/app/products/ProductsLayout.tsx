'use client';

import { DocumentSnapshot } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Card from '../_components/Card/Card';
import SkeletonCard from '../_components/Card/SkeletonCard';
import { ColorsInterfaceResponse } from '../lib/models/Colors';
import type {
	ProductInterface,
	ProductsFiltersInterface,
} from '../lib/models/Products';
import { getAllProducts } from '../lib/services/productService';
import Filters from './_filter/Filters';
import TopFilters from './_filter/TopFilters';

interface ProductsLayoutProps {
	colors: ColorsInterfaceResponse[];
	initialProducts: ProductInterface[];
	initialLastVisibleId: string | null | undefined;
	params: {
		[key: string]: string | string[] | undefined;
	};
}

const ProductsLayout = ({
	initialProducts,
	colors,
	initialLastVisibleId,
	params,
}: ProductsLayoutProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [products, setProducts] = useState(initialProducts);
	const [lastVisibleId, setLastVisibleId] = useState(initialLastVisibleId);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(initialProducts.length === 5);

	useEffect(() => {
		setProducts(initialProducts);
		setLastVisibleId(initialLastVisibleId);
		setHasMore(initialProducts.length === 5);
	}, [initialProducts, initialLastVisibleId]);

	const updateParams = (option: string, value: string) => {
		startTransition(() => {
			const params = new URLSearchParams(searchParams.toString());
			if (value === '') params.delete(option);
			else params.set(option, value);

			router.push(`?${params.toString()}`);
		});
	};

	const handleMoreProducts = async () => {
		setLoading(true);
		const { products: newProducts, lastVisibleId: newLastVisibleId } =
			await getAllProducts(params, lastVisibleId);

		setProducts((prev) => [...prev, ...newProducts]);
		setLastVisibleId(newLastVisibleId);
		setLoading(false);

		if (newProducts.length < 5) setHasMore(false);
	};

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
				{hasMore && (
					<div className="mt-10 text-center">
						<button
							type="button"
							disabled={loading}
							className={`bg-white rounded-full  p-4 font-semibold leading-1.5 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-sm ${loading ? 'animate-pulse' : ''}`}
							onClick={handleMoreProducts}
						>
							Load More
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductsLayout;
