import Image from 'next/image';
import heroImage from '@/../public/images/hero-mugs.webp';
import BrandCarousel from './_components/BrandCarousel/BrandCarousel';

export default function Home() {
	return (
		<main className="min-h-screen pt-16">
			<section className="bg-white py-16 md:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
					<div className="md:w-1/2 text-center md:text-left">
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
							Simplify your Mornings
						</h2>
						<h4 className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 mt-4">
							Discover our curated collection of artisan coffee mugs designed
							for modern living.
						</h4>
						<a
							href="/"
							className="inline-block mt-8 bg-accent-500 rounded-full text-center text-white text-lg px-8 py-3 font-bold shadow-lg hover:bg-accent-600 transition duration-300"
						>
							Shop the Collection
						</a>
					</div>
					<div className=" w-full md:w-1/2 mx-auto flex items-center justify-center">
						<Image
							src={heroImage}
							alt="Mugs"
							className="rounded-2xl shadow-xl md:h-auto md:w-full"
							priority
						/>
					</div>
				</div>
			</section>
			<section className=" bg-background-50 py-16 md:py-24 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<BrandCarousel />
				</div>
			</section>
		</main>
	);
}
