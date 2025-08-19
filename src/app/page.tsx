import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import heroImage from '@/../public/images/hero-mugs.webp';
import BrandCarousel from './_components/BrandCarousel/BrandCarousel';
import SkeletonCard from './_components/Card/SkeletonCard';
import HomeCards from './_components/Home/HomeCards';
import ReviewCard from './_components/ReviewCard/ReviewCard';
import { routes } from './lib/models/Routes';
import { getFeaturedProducts } from './lib/services/productService';

export default function Home() {
	const products = getFeaturedProducts();
	return (
		<>
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
						<Link
							href={routes.products}
							className="inline-block mt-8 bg-accent-500 rounded-full text-center text-white text-lg px-8 py-3 font-bold shadow-lg hover:bg-accent-600 transition duration-300"
						>
							Shop the Collection
						</Link>
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
					<div className="mt-10 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-10">
						<Suspense
							fallback={
								<>
									<SkeletonCard />
									<SkeletonCard />
									<SkeletonCard />
									<SkeletonCard />
								</>
							}
						>
							<HomeCards featuredProd={products} />
						</Suspense>
					</div>
				</div>
			</section>

			<section className=" bg-background-50 py-16 md:py-24 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h3 className="text-center text-2xl md:text-4xl text-gray-600 font-extrabold ">
						What Our Customers Say
					</h3>
					<div className="mt-10 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<ReviewCard
							name="Jane Doe"
							review="Absolutely love my new mug. The design is so simple and elegant, and it feels great in my hand. It's the perfect size for my morning coffee. "
						/>
						<ReviewCard
							name="Jane Doe"
							review="The quality is exceptional. I've been looking for a mug like this for ages. It's stylish and feels incredibly durable. Highly recommend!"
						/>
						<ReviewCard
							name="Sarah Miller"
							review="My new go-to mug. The minimalist design fits perfectly with my kitchen aesthetic. The color is beautiful and exactly as pictured."
						/>
					</div>
				</div>
			</section>

			<section className=" bg-white py-16 md:py-24 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h3 className="text-2xl md:text-4xl  font-bold">
							Crafted for Simplicity
						</h3>
						<p className="my-8 max-w-2xl mx-auto text-lg text-gray-600">
							At The Minimalist Market, we believe in the beauty of simplicity.
							Each mug is a testament to quality craftsmanship and thoughtful
							design, made to be a cherished part of your daily ritual.
						</p>
						<a
							href="/"
							className="inline-block font-medium text-lg text-accent-500 border-b-2 border-accent-500 hover:text-accent-600 hover:border-accent-600 transition-colors duration-300"
						>
							Learn More About Us
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
