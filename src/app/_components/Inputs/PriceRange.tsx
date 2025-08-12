'use client';

interface PriceRangeProps {
	value: number;
}

const PriceRange = ({ value }: PriceRangeProps) => {
	return (
		<div className="flex items-center space-x-4 mt-2 relative">
			<div className="flex flex-col">
				<label
					htmlFor="value_min"
					className="text-gray-500 text-sm font-semibold mb-1"
				>
					Min
				</label>
				<input
					type="number"
					placeholder="Min"
					id="value_min"
					value={value}
					onChange={() => {}}
					className="rounded border-1 border-gray-300 shadow-sm pl-2 py-1 w-full"
				/>
			</div>
			<span className="inline-block mt-5">-</span>
			<div className="flex flex-col">
				<label
					htmlFor="value_max"
					className="text-gray-500 text-sm font-semibold mb-1"
				>
					Max
				</label>
				<input
					type="number"
					placeholder="Max"
					id="value_max"
					value={value}
					onChange={() => {}}
					className="rounded border-1 border-gray-300 shadow-sm pl-2 py-1 w-full"
				/>
			</div>
		</div>
	);
};

export default PriceRange;
