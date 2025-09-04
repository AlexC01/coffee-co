import { notFound } from 'next/navigation';
import BreadCrumb from '@/app/_components/BreadCrumb';
import OrderDetail from '@/app/_components/Order/OrderDetail';
import { routes } from '@/app/lib/models/Routes';
import { getSingleOrder } from '@/app/lib/services/ordersService';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;

	const order = await getSingleOrder(slug);

	if (!order) notFound();

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-28">
			<BreadCrumb
				links={[
					{ label: 'Home', route: routes.home },
					{ label: 'Orders', route: routes.orders },
				]}
			/>

			<div className="mt-10 text-center">
				<h2 className="text-3xl font-bold text-gray-600">Order Confirmed!</h2>
				<p className="text-lg mt-2">
					Thank you for your purchase. Your order details are below.
				</p>
			</div>
			<div className="mt-10">{order && <OrderDetail order={order} />}</div>
		</div>
	);
};

export default page;
