import CartProducts from '../_components/Cart/CartProducts';

const page = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-16">
			<div className="mt-10 text-center">
				<h2 className="text-2xl xl:text-5xl font-bold text-gray-700 leading-tight">
					Your Cart
				</h2>
			</div>
			<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
				<CartProducts />
			</div>
		</div>
	);
};

export default page;
