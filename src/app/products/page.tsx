import Card from '../_components/Card/Card';
import { getAllProducts } from '../lib/services/productService';
import Filters from './_filter/Filters';
import TopFilters from './_filter/TopFilters';

const Products = async () => {
	const products = await getAllProducts();
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
			<section className="mt-10 flex flex-grow flex-col md:flex-row gap-8">
				<Filters products={products} />
				<div className="">
					<TopFilters />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{products.map((product) => (
							<Card
								key={product.id}
								title={product.name}
								price={product.price.toString()}
								images={product.images}
								colors={product.colors}
								sizes={product.sizes}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Products;
