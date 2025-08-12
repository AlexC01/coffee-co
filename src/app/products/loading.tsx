import SkeletonCard from '../_components/Card/SkeletonCard';

const loading = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
			<div className="mt-10 text-center">
				<h2 className="text-2xl xl:text-5xl font-bold text-gray-700 leading-tight">
					Our Products
				</h2>
				<p className="mt-5 text-gray-600 text-xl font-medium">
					Explore our curated selection of high-quality coffee mugs and
					accessories.
				</p>
			</div>
			<section className="mt-10 grid grid-cols-3 gap-5">
				<div className="bg-white shadow-md rounded-xl animate-pulse h-full" />
				<div className="grid grid-cols-3 col-span-2 gap-6">
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</div>
			</section>
		</div>
	);
};

export default loading;
