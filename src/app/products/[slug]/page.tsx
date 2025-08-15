import { notFound } from 'next/navigation';
import { getSingleProduct } from '@/app/lib/services/productService';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const product = await getSingleProduct(slug);

	if (!product) notFound();
	return <div>{slug}</div>;
};

export default page;
