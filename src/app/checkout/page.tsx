import CheckoutPage from '../_components/Checkout/CheckoutForm';
import CheckoutSummary from '../_components/Checkout/CheckoutSummary';

const page = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-16">
			<div className="mt-10 text-center">
				<h2 className="text-3xl lg:text-5xl font-bold text-gray-700 leading-tight">
					Checkout
				</h2>
			</div>
			<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-5 items-start">
				<CheckoutPage />
				<CheckoutSummary />
			</div>
		</div>
	);
};

export default page;
