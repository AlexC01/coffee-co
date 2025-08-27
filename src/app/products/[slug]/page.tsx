import { notFound } from 'next/navigation';
import BreadCrumb from '@/app/_components/BreadCrumb';
import ProductDetail from '@/app/_components/ProductDetail/ProductDetail';
import Reviews from '@/app/_components/ProductDetail/Reviews';
import { routes } from '@/app/lib/models/Routes';
import { getSingleProduct } from '@/app/lib/services/productService';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const product = await getSingleProduct(slug);

	if (!product) notFound();
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-28 pb-16">
			<BreadCrumb
				links={[
					{ label: 'Home', route: routes.home },
					{ label: 'Products', route: routes.products },
				]}
			/>

			<ProductDetail product={product} />
			<div className="mt-20">
				<h3 className="text-2xl sm:text-3xl font-bold mb-4">
					Customer Reviews
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Reviews />
					<Reviews />
					<Reviews />
				</div>
			</div>
		</div>
	);
};

export default page;
