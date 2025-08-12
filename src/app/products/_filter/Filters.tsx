import ColorFilter from '@/app/_components/Inputs/ColorFilter';
import PriceRange from '@/app/_components/Inputs/PriceRange';
import type { ProductInterface } from '@/app/lib/models/Products';

interface FiltersProps {
	products: ProductInterface[];
}

const Filters = ({ products }: FiltersProps) => {
	return (
		<section className="bg-white px-4 py-2 shadow-md rounded-xl md:w-1/2 h-fit">
			<h3 className="text-3xl font-bold text-gray-600 mt-3">Filters</h3>
			<hr className="mt-2" />
			<div className="mt-4">
				<h4 className="text-xl font-semibold text-gray-500 ">Price</h4>
				<PriceRange value={2} />
			</div>
			<div className="mt-6">
				<h4 className="text-xl font-semibold text-gray-500">Colors</h4>
				<ColorFilter
					colors={products.flatMap((item) => item.colors)}
					selected={[]}
				/>
			</div>
		</section>
	);
};

export default Filters;
