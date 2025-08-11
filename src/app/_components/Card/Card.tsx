'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ColorSelector from './ColorSelector';

interface CardsProps {
	title: string;
	price: string;
	images: string[];
	colors: string[];
	sizes: string[];
}

const Card = ({ title, price, images, colors, sizes }: CardsProps) => {
	const [currentSelection, setCurrentSelection] = useState(0);

	const updateSelection = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: number,
	) => {
		e.stopPropagation();
		setCurrentSelection(value);
	};

	return (
		<div className="w-full shadow-md rounded-b-lg bg-white relative cursor-pointer hover:shadow-xl transition-shadow duration-400">
			<div className="flex flex-col space-y-1 h-full relative ">
				<Image
					src={images[currentSelection]}
					alt="Mugs"
					width={500}
					height={500}
					className="rounded-t-xl shadow-md h-auto object-cover w-full"
					priority
				/>
				<div className="flex flex-col flex-grow p-4">
					<h4 className="text-sm text-gray-700 font-semibold ">{title}</h4>
					<span className="text-sm text-gray-500 inline-block ">
						{sizes.join(' / ')}
					</span>
					<ColorSelector
						colors={colors}
						selected={currentSelection}
						changeSelected={updateSelection}
					/>
					<div className="mt-auto flex justify-between items-center">
						<span className="text-gray-700 text-md font-semibold">
							${Number(price).toFixed(2)}
						</span>
						<Heart
							strokeWidth={1.5}
							className="hover:text-accent-600 transition-colors duration-200"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
