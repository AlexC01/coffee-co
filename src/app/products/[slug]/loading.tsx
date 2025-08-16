const loading = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-14 pb-16">
			<section className="flex flex-col md:flex-row  justify-between gap-12">
				<div className="w-1/2 h-80 rounded-md bg-gray-400 mb-5" />

				<div className="md:w-1/2 text-center md:text-left animate-pulse">
					<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					<div>
						<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					</div>
					<hr className="mt-2 text-gray-400" />
					<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					<div className="mt-2">
						<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					</div>
					<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
				</div>
			</section>
		</div>
	);
};

export default loading;
