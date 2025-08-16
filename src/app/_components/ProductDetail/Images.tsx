'use client';

import Image from 'next/image';

interface ImagesProps {
	imagesArray: string[];
	imageSelected: number;
	updateImageSelected: (option: number) => void;
}

const Images = ({
	imagesArray,
	imageSelected,
	updateImageSelected,
}: ImagesProps) => {
	return (
		<div className="flex flex-row items-center gap-2">
			{imagesArray.map((image, index) => (
				<button
					type="button"
					key={image}
					onClick={() => updateImageSelected(index)}
				>
					<Image
						src={image}
						alt="Mug"
						width={80}
						height={80}
						className={`rounded-md shadow-lg ${index === imageSelected ? 'border-2 border-gray-500' : ''} cursor-pointer transition-all duration-200 hover:shadow-sm`}
					/>
				</button>
			))}
		</div>
	);
};

export default Images;
