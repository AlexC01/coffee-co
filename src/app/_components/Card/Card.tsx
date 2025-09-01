'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { routes } from '@/app/lib/models/Routes';
import ColorSelector from './ColorSelector';

interface CardsProps {
	title: string;
	price: string;
	images: string[];
	colors: string[];
	sizes: string[];
	slug: string;
}

const Card = ({ title, price, images, colors, sizes, slug }: CardsProps) => {
	const [currentSelection, setCurrentSelection] = useState(0);

	const updateSelection = (value: number) => setCurrentSelection(value);

	return (
		<Link href={`${routes.products}/${slug}`} prefetch={false}>
			<div className="w-full shadow-md rounded-b-lg bg-white relative cursor-pointer hover:shadow-xl transition-shadow duration-400 rounded-t-xl">
				<div className="flex flex-col space-y-1 h-full relative ">
					<Image
						src={images[currentSelection]}
						alt="Mugs"
						width={500}
						height={500}
						className="rounded-t-xl shadow-md h-auto object-cover w-full"
						priority
					/>
					<div className="flex flex-col flex-grow px-4 pt-3 pb-2">
						<h4 className="text-sm text-gray-700 font-semibold ">{title}</h4>
						<span className="text-sm text-gray-500 inline-block ">
							{sizes.join(' / ')}
						</span>

						<div className="mt-auto flex justify-between items-center">
							<ColorSelector
								colors={colors}
								selected={currentSelection}
								changeSelected={updateSelection}
							/>
							<span className="text-gray-700 text-md font-semibold">
								${Number(price).toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
