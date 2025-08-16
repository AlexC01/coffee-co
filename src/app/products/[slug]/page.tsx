import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetail from '@/app/_components/ProductDetail/ProductDetail';
import { routes } from '@/app/lib/models/Routes';
import { getSingleProduct } from '@/app/lib/services/productService';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const product = await getSingleProduct(slug);

	if (!product) notFound();
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-14 pb-16">
			<nav aria-label="BreadCrumb" className="mb-5">
				<ol className="flex items-center gap-1 text-md text-gray-500 ">
					<li>
						<Link
							href={routes.home}
							className="block transition-colors duration-150 hover:text-gray-900"
						>
							Home
						</Link>
					</li>
					<li>
						<ChevronRight size={16} />
					</li>
					<li>
						<Link
							href={routes.products}
							className="block transition-colors duration-150 hover:text-gray-900"
						>
							Products
						</Link>
					</li>
				</ol>
			</nav>
			<ProductDetail product={product} />
		</div>
	);
};

export default page;
