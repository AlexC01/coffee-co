import React from 'react';
import BrandCarousel from '../_components/BrandCarousel/BrandCarousel';

const page = () => {
	return (
		<main className="flex-grow pt-15">
			<section
				className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center text-white p-4"
				style={{
					backgroundImage: `url('https://placehold.co/1920x500/4A3837/D0B8A8?text=Our+Story')`,
				}}
			>
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg">
					About Us
				</h1>
			</section>
			<section className="container mx-auto px-4 py-16 text-center max-w-4xl">
				<h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-6">
					Our Mission and Vision
				</h2>
				<p className="text-neutral-600 text-lg leading-relaxed mb-6">
					Founded on a simple love for a good cup of coffee, Coffee Co. was
					created to provide people with the perfect vessels for their daily
					ritual. We believe that the mug you choose is just as important as the
					coffee you brew. That's why we're dedicated to crafting high-quality,
					beautifully designed mugs and tumblers that make every sip a moment to
					savor.
				</p>
				<p className="text-neutral-600 text-lg leading-relaxed">
					Our vision is to become the go-to brand for all coffee lovers,
					offering products that combine aesthetic beauty, functionality, and
					sustainability. We are committed to sourcing ethically and ensuring
					our products are made with the highest standards.
				</p>
			</section>
			<section className=" bg-background-50 py-16 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<BrandCarousel />
				</div>
			</section>
		</main>
	);
};

export default page;
