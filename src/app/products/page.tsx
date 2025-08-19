import { productFilterSchema } from '../lib/schemas/productFilterSchema';
import { getAllColors } from '../lib/services/colorService';
import { getAllProducts } from '../lib/services/productService';
import ProductsLayout from './ProductsLayout';

const Products = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const params = await searchParams;
	const result = productFilterSchema.safeParse(params);
	if (!result.success) {
		return (
			<div className="text-center p-16">
				<h2 className="text-xl text-red-600">Invalid URL Parameters</h2>
			</div>
		);
	}

	const validatedParams = result.data;
	const { products: initialProducts, lastVisibleId: initialLastVisibleId } =
		await getAllProducts(validatedParams);
	const colors = await getAllColors();
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
			<ProductsLayout
				initialProducts={initialProducts}
				colors={colors}
				initialLastVisibleId={initialLastVisibleId}
				params={validatedParams}
			/>
		</div>
	);
};

export default Products;
