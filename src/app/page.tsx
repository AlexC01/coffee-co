import Image from 'next/image';
import heroImage from '@/../public/images/hero-mugs.webp';
import BrandCarousel from './_components/BrandCarousel/BrandCarousel';
import Card from './_components/Card/Card';

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

			<section className=" bg-white py-16 md:py-24 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h3 className="text-2xl md:text-4xl text-center font-bold">
						Our Best Sellers
					</h3>
					<div className="mt-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-10">
						<Card
							title="Owala 32oz. FreeSip Stainless Steel Water Bottle"
							price="44.44"
						/>
						<Card title="Porto Brasil Organic Mug Set of 4" price="2806.44" />
						<Card title="Villeroy & Boch NewWave Caffè Mug" price="24.44" />
						<Card title="Ocean Bottle Original 34-Ounce Bottle" price="33.1" />
					</div>
				</div>
			</section>
		</main>
	);
}
