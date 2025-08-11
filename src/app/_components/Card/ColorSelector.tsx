interface ColorSelectorProps {
	colors: string[];
	selected: number;
	changeSelected: (
		e: React.MouseEvent<HTMLButtonElement>,
		value: number,
	) => void;
}
const colorMap = {
	'creamy-beige': 'bg-creamy-beige',
	'baby-blue': 'bg-baby-blue',
	'deep-blue': 'bg-deep-blue',
	'forest-green': 'bg-forest-green',
	'midnight-blue': 'bg-midnight-blue',
};

const ColorSelector = ({
	colors,
	selected,
	changeSelected,
}: ColorSelectorProps) => {
	return (
		<div className="flex items-center space-x-2 mt-3 mb-3">
			{colors.map((item, index) => {
				const newId = item
					.toLowerCase()
					.replace(/\s/g, '-') as keyof typeof colorMap;
				const colorClass = colorMap[newId] || 'bg-gray-200';
				return (
					<button
						type="button"
						key={newId}
						className={`w-5 h-5 ${colorClass} rounded-full border-2 cursor-pointer transition-all duration-200 ${selected === index ? 'border-gray-400 ring-2 ring-offset-1 ring-gray-400' : 'border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'}`}
						onClick={(e) => changeSelected(e, index)}
					/>
				);
			})}
		</div>
	);
};

export default ColorSelector;
