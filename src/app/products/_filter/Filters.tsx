'use client';

import { useState } from 'react';
import ColorFilter from '@/app/_components/Inputs/ColorFilter';
import PriceRange from '@/app/_components/Inputs/PriceRange';
import type { ProductInterface } from '@/app/lib/models/Products';

interface FiltersProps {
	products: ProductInterface[];
}

const Filters = ({ products }: FiltersProps) => {
	const [minValue, setMinValue] = useState('0');
	const [maxValue, setMaxValue] = useState('0');

	const [maxCap, setMaxCap] = useState(10);

	const updatePriceFilter = (value: string, priceType: 'min' | 'max') => {
		let newVal = value;
		const parsedValue = parseFloat(value);

		if (parsedValue < 0) newVal = '0';
		if (parsedValue > maxCap) newVal = maxCap.toString();

		if (priceType === 'min') {
			setMinValue(newVal);

			if (parseFloat(newVal) > parseFloat(maxValue) && maxValue !== '')
				setMaxValue(newVal);
		} else {
			setMaxValue(newVal);

			if (parseFloat(newVal) < parseFloat(minValue) && minValue !== '')
				setMinValue(newVal);
		}
	};

	const [colorsSelected, setColorsSelected] = useState<string[]>([]);

	const selectColor = (value: string) => {
		let arr = [...colorsSelected];
		if (colorsSelected.includes(value)) {
			arr = arr.filter((color) => color !== value);
		} else {
			arr.push(value);
		}

		setColorsSelected(arr);
	};

	return (
		<section className="bg-white px-4 py-2 shadow-md rounded-xl md:w-1/2 h-fit">
			<h3 className="text-3xl font-bold text-gray-600 mt-3">Filters</h3>
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
					colors={products.flatMap((item) => item.colors)}
					selected={colorsSelected}
					selectColor={selectColor}
				/>
			</div>
		</section>
	);
};

export default Filters;
