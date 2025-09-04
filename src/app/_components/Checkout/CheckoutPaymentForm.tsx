'use client';

import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { routes } from '@/app/lib/models/Routes';
import { useCartStore } from '@/app/lib/store/useCartStore';

interface FormProps {
	clientSecret: string | null;
}

const CheckoutPaymentForm = ({ clientSecret }: FormProps) => {
	const router = useRouter();
	const stripe = useStripe();
	const elements = useElements();
	const { clearCart } = useCartStore();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async () => {
		if (!stripe || !elements) return;

		setLoading(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		});

		if (error) {
			setErrorMessage(error.message || 'An unexepected error occurred');
			toast.error(error.message ?? 'Payment failed!');
			setLoading(false);
		} else {
			if (paymentIntent.status === 'succeeded') {
				clearCart();
				router.replace(`${routes.checkoutSuccess}?order=${paymentIntent.id}`);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-6 bg-white rounded-lg shadow-md w-full"
		>
			<h2 className="text-2xl font-bold ">Complete your purchase</h2>
			<span className="text-sm text-gray-500 mb-4 block">
				Use 4242424242424242 as the card number for testing purposes
			</span>
			<div className="mb-4">
				<PaymentElement />
			</div>
			{errorMessage && (
				<div className="text-red-500 text-sm mt-2">{errorMessage}</div>
			)}
			<button
				className="w-full py-2 px-4 bg-accent-500 text-white font-semibold uppercase shadow-md rounded-md hover:bg-accent-600 cursor-pointer transition-colors duration-200"
				type="button"
				disabled={!stripe || loading}
				onClick={() => handleSubmit()}
			>
				{loading ? 'Processing...' : 'Pay Now'}
			</button>
		</form>
	);
};

export default CheckoutPaymentForm;
