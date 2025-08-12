'use client';

import { useState } from 'react';
import { productsColorMap } from '@/app/lib/models/Products';

interface ColorFilterProps {
	colors: string[];
	selected: string[];
}

const ColorFilter = ({ colors, selected }: ColorFilterProps) => {
	const [hoveredColor, setHoveredColor] = useState<string | null>(null);
	return (
		<div className="flex items-center flex-wrap space-x-2 mt-3 mb-3">
			{colors.map((color, index) => {
				const newId = color
					.toLowerCase()
					.replace(/\s/g, '-') as keyof typeof productsColorMap;
				const colorClass = productsColorMap[newId] || 'bg-gray-200';
				return (
					<div key={newId} className="relative">
						<button
							type="button"
							onMouseEnter={() => setHoveredColor(newId)}
							onMouseLeave={() => setHoveredColor(null)}
							className={`w-8 h-8 ${colorClass} rounded-full border-2 cursor-pointer transition-all duration-200 ${selected.includes(newId) ? 'border-gray-400 ring-2 ring-offset-1 ring-gray-400' : 'border-gray-300 hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'}`}
							onClick={(e) => {}}
						/>

						{hoveredColor === newId && (
							<span className="absolute -left-4 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50">
								{color}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ColorFilter;
