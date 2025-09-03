import CheckoutSuccess from '@/app/_components/Checkout/CheckoutSuccess';

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
	const params = await searchParams;

	if (!params.order || params.order === '') {
		return (
			<div className="flex items-center justify-center max-w-7xl mx-auto pt-16">
				<h1 className="mt-20 text-2xl md:text-4xl text-gray-600 w-2/3 text-center">
					No order identified, go back to the products section in order to make
					a purchase.
				</h1>
			</div>
		);
	}
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-16">
			<CheckoutSuccess orderId={params.order} />
		</div>
	);
};

export default page;
