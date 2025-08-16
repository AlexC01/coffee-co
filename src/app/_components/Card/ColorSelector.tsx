import { productsColorMap } from '@/app/lib/models/Products';

interface ColorSelectorProps {
	colors: string[];
	selected: number;
	changeSelected: (value: number) => void;
	bigger?: boolean;
}

const ColorSelector = ({
	colors,
	selected,
	changeSelected,
	bigger,
}: ColorSelectorProps) => {
	const handleColorClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: number,
	) => {
		e.preventDefault();
		changeSelected(value);
	};

	return (
		<div className="flex items-center flex-wrap space-x-2 mt-3 mb-3">
			{colors.map((item, index) => {
				const newId = item
					.toLowerCase()
					.replace(/\s/g, '-') as keyof typeof productsColorMap;
				const colorClass = productsColorMap[newId] || 'bg-gray-200';
				return (
					<button
						type="button"
						key={newId}
						className={`${bigger ? 'w-8 h-8' : 'w-5 h-5'} ${colorClass} rounded-full border-2 cursor-pointer transition-all duration-200 ${selected === index ? 'border-gray-400 ring-2 ring-offset-1 ring-gray-400' : 'border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'}`}
						onClick={(e) => handleColorClick(e, index)}
					/>
				);
			})}
		</div>
	);
};

export default ColorSelector;
