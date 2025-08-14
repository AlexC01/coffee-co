/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import { useEffect, useState } from 'react';
import ColorFilter from '@/app/_components/Inputs/ColorFilter';
import useDebounce from '@/app/hooks/useDebounce';
import type { ColorsInterfaceResponse } from '@/app/lib/models/Colors';
import type { ProductInterface } from '@/app/lib/models/Products';
import PriceRange from './PriceRange';

interface FiltersProps {
	products: ProductInterface[];
	colors: ColorsInterfaceResponse[];
	updateParams: (option: string, value: string) => void;
}

const Filters = ({ products, colors, updateParams }: FiltersProps) => {
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
	const debouncedColorSelect = useDebounce({
		value: colorsSelected.join(','),
		delay: 700,
	});

	useEffect(() => {
		if (debouncedColorSelect) updateParams('colors', debouncedColorSelect);
		else updateParams('colors', '');
	}, [debouncedColorSelect]);

	const selectColor = (value: string) => {
		let arr = [...colorsSelected];
		if (colorsSelected.includes(value))
			arr = arr.filter((color) => color !== value);
		else arr.push(value);

		setColorsSelected(arr);
	};

	return (
		<section className="bg-white px-4 py-2 shadow-md rounded-xl md:w-full h-fit">
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
					colors={colors}
					selected={colorsSelected}
					selectColor={selectColor}
				/>
			</div>
		</section>
	);
};

export default Filters;
