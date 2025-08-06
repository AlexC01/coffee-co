const brandNames = [
	{ id: 1, name: 'Design Hub' },
	{ id: 2, name: 'Bean Brew' },
	{ id: 3, name: 'The Grind' },
	{ id: 4, name: 'Coffee Co' },
	{ id: 5, name: 'Urban Roast' },
	{ id: 6, name: 'Kitty Coffee' },
];

const combinedBrands = [...brandNames, ...brandNames];

const BrandCarousel = () => {
	return (
		<div>
			<h3 className="text-center text-2xl md:text-3xl text-gray-600 font-extrabold ">
				Trusted by cafes and designers worldwide
			</h3>

			<div className="px-4 mt-4">
				<div className="scrolling-logos mt-10">
					<div className="scrolling-logos-inner flex">
						{combinedBrands.map((brand, index) => (
							<h4
								key={`${brand.id}-${index}`}
								className="font-semibold text-xl md:text-2xl text-gray-400 whitespace-nowrap"
							>
								{brand.name}
							</h4>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrandCarousel;
