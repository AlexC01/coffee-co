/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ColorFilter from '@/app/_components/Inputs/ColorFilter';
import useDebounce from '@/app/hooks/useDebounce';
import type { ColorsInterfaceResponse } from '@/app/lib/models/Colors';
import PriceRange from './PriceRange';

interface FiltersProps {
	colors: ColorsInterfaceResponse[];
	updateParams: (option: string, value: string) => void;
	minValue: string;
	maxValue: string;
	updatePriceFilter: (value: string, priceType: 'min' | 'max') => void;
	colorsSelected: string[];
	selectColor: (value: string) => void;
	clearFilters: () => void;
}

const Filters = ({
	colors,
	updateParams,
	maxValue,
	minValue,
	updatePriceFilter,
	colorsSelected,
	selectColor,
	clearFilters,
}: FiltersProps) => {
	const searchParams = useSearchParams();

	const debouncedPriceMin = useDebounce({
		value: minValue,
		delay: 700,
	});
	const debouncedPriceMax = useDebounce({
		value: maxValue,
		delay: 700,
	});

	const debouncedColorSelect = useDebounce({
		value: colorsSelected.join(','),
		delay: 700,
	});

	useEffect(() => {
		if (debouncedColorSelect) updateParams('colors', debouncedColorSelect);
		else if (!debouncedColorSelect && searchParams.get('colors'))
			updateParams('colors', '');
	}, [debouncedColorSelect]);

	useEffect(() => {
		if (debouncedPriceMin && debouncedPriceMin !== '0')
			updateParams('price_min', debouncedPriceMin);
		else if (!debouncedPriceMin && searchParams.get('price_min'))
			updateParams('price_min', '');
	}, [debouncedPriceMin]);

	useEffect(() => {
		if (debouncedPriceMax && debouncedPriceMax !== '0')
			updateParams('price_max', debouncedPriceMax);
		else if (!debouncedPriceMax && searchParams.get('price_max'))
			updateParams('price_max', '');
	}, [debouncedPriceMax]);

	return (
		<section className="bg-white px-4 py-2 shadow-md rounded-xl md:w-full h-fit">
			<div className="flex items-center justify-between ">
				<h3 className="text-3xl font-bold text-gray-600 mt-3">Filters</h3>
				<button
					type="button"
					disabled={false}
					className={`border rounded-full p-3 font-semibold leading-1.5 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-sm `}
					onClick={clearFilters}
				>
					Clear All
				</button>
			</div>
			<hr className="mt-2" />
			<div className="mt-4">
				<h4 className="text-xl font-semibold text-gray-500 ">Price</h4>
				<PriceRange
					min_value={minValue}
					max_value={maxValue}
					updatePriceFilter={updatePriceFilter}
				/>
			</div>
			<div className="mt-6">
				<h4 className="text-xl font-semibold text-gray-500">Colors</h4>
				<ColorFilter
					colors={colors}
					selected={colorsSelected}
					selectColor={selectColor}
				/>
			</div>
		</section>
	);
};

export default Filters;
