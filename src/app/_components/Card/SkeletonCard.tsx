const SkeletonCard = () => {
	return (
		<div className="w-full shadow-md rounded-b-lg bg-white relative cursor-pointer hover:shadow-xl transition-shadow duration-400">
			<div className="flex flex-col space-y-1 h-full animate-pulse">
				<div className="w-ful h-50 sm:h-48 md:h-64 lg:h-56 xl:h-64 bg-gray-400 rounded-t-xl shadow-md" />
				<div className="flex flex-col flex-grow p-4">
					<div className="size-3 w-full rounded-full bg-gray-400 mb-5" />
					<div className="size-3 w-2/5 rounded-full bg-gray-400 mb-5" />
					<div className="mt-auto flex justify-between items-center">
						<div className="rounded-full bg-gray-400 size-3 w-1/4" />
						<div className="rounded-full bg-gray-400 size-4" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonCard;
