'use client';

import Image from 'next/image';

interface ImagesProps {
	imagesArray: string[];
}

const Images = ({ imagesArray }: ImagesProps) => {
	return (
		<div className="flex flex-row items-center gap-2">
			{imagesArray.map((image) => (
				<div key={image}>
					<Image
						src={image}
						alt="Mug"
						width={80}
						height={80}
						className=" rounded-md shadow-lg border-1 border-gray-500 cursor-pointer transition-all duration-200 hover:shadow-sm"
					/>
				</div>
			))}
		</div>
	);
};

export default Images;
