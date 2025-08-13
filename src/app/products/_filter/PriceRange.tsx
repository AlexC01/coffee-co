'use client';

import NumberInput from '@/app/_components/Inputs/NumberInput';

interface PriceRangeProps {
	min_value: string;
	max_value: string;
	updatePriceFilter: (value: string, priceType: 'min' | 'max') => void;
}

const PriceRange = ({
	min_value,
	max_value,
	updatePriceFilter,
}: PriceRangeProps) => {
	return (
		<div className="flex items-center space-x-4 mt-2 relative">
			<NumberInput
				placeholder="Min"
				id="value_min"
				onChange={(value: string) => updatePriceFilter(value, 'min')}
				label
				value={min_value}
			/>

			<span className="inline-block mt-5">-</span>
			<NumberInput
				placeholder="Max"
				id="value_max"
				onChange={(value: string) => updatePriceFilter(value, 'max')}
				label
				value={max_value}
			/>
		</div>
	);
};

export default PriceRange;
