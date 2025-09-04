import OrderLayout from '../_components/Order/OrderLayout';

const page = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-16">
			<div className="mt-10 text-center">
				<h2 className="text-2xl xl:text-5xl font-bold text-gray-700 leading-tight">
					Your orders
				</h2>
			</div>
			<OrderLayout />
		</div>
	);
};

export default page;
