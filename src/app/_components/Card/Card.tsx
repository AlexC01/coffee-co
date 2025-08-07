import { Heart } from 'lucide-react';
import Image from 'next/image';
import heroImage from '@/../public/images/hero-mugs.webp';

interface CardsProps {
	title: string;
	price: string;
}

const Card = ({ title, price }: CardsProps) => {
	return (
		<div className="w-full shadow-md rounded-b-lg bg-white relative cursor-pointer hover:shadow-xl transition-shadow duration-400">
			<div className="flex flex-col space-y-1 h-full ">
				<Image
					src={heroImage}
					alt="Mugs"
					className="rounded-t-xl shadow-md h-auto object-cover md:h-auto md:w-full"
					priority
				/>
				<div className="flex flex-col flex-grow p-4">
					<h4 className="text-sm text-gray-700 font-semibold mb-5">{title}</h4>
					<div className="mt-auto flex justify-between items-center">
						<span className="text-gray-500 text-sm font-semibold">
							${price}
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
