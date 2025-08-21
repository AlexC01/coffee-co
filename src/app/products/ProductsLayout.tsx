'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Card from '../_components/Card/Card';
import SkeletonCard from '../_components/Card/SkeletonCard';
import type { ColorsInterfaceResponse } from '../lib/models/Colors';
import type { ProductInterface } from '../lib/models/Products';
import { getAllProducts } from '../lib/services/productService';
import Filters from './_filter/Filters';
import TopFilters from './_filter/TopFilters';

interface ProductsLayoutProps {
	colors: ColorsInterfaceResponse[];
	initialProducts: ProductInterface[];
	initialLastVisibleId: string | null | undefined;
	params: {
		search?: string | undefined;
		colors?: string | undefined;
		sortBy?: 'featured' | 'price-asc' | 'price-desc' | undefined;
		minPrice?: number | undefined;
		maxPrice?: number | undefined;
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

	const [minValue, setMinValue] = useState('0');
	const [maxValue, setMaxValue] = useState('0');

	const updatePriceFilter = (value: string, priceType: 'min' | 'max') => {
		let newVal = value;
		const parsedValue = parseFloat(value);

		if (parsedValue < 0) newVal = '0';

		if (priceType === 'min') {
			setMinValue(newVal);

			if (parseFloat(newVal) > parseFloat(maxValue) && maxValue !== '')
				setMaxValue('0');
		} else {
			setMaxValue(newVal);

			if (parseFloat(newVal) < parseFloat(minValue) && minValue !== '')
				setMinValue(newVal);
		}
	};

	const [colorsSelected, setColorsSelected] = useState<string[]>([]);
	const selectColor = (value: string) => {
		let arr = [...colorsSelected];
		if (colorsSelected.includes(value))
			arr = arr.filter((color) => color !== value);
		else arr.push(value);

		setColorsSelected(arr);
	};

	const [search, setSearch] = useState<string>(
		searchParams.get('search') || '',
	);
	const updateSearch = (value: string) => setSearch(value);

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

	const clearFilters = () => {
		router.push('/products');
		setMinValue('0');
		setMaxValue('0');
		setSearch('');
		setColorsSelected([]);
	};

	return (
		<section className="mt-10 flex flex-grow flex-col md:grid md:grid-cols-3  gap-8">
			<Filters
				colors={colors}
				updateParams={updateParams}
				updatePriceFilter={updatePriceFilter}
				minValue={minValue}
				maxValue={maxValue}
				colorsSelected={colorsSelected}
				selectColor={selectColor}
				clearFilters={clearFilters}
			/>
			<div className="md:col-span-2">
				<TopFilters
					updateParams={updateParams}
					search={search}
					updateSearch={updateSearch}
				/>
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
									slug={product.slug}
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
