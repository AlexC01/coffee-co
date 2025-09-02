'use client';

import {
	CardElement,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface FormProps {
	clientSecret: string | null;
}

const CheckoutPaymentForm = ({ clientSecret }: FormProps) => {
	const stripe = useStripe();
	const elements = useElements();
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
		} else {
			console.log(paymentIntent);
		}

		setLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-6 bg-white rounded-lg shadow-md w-full"
		>
			<h2 className="text-2xl font-bold mb-4">Complete your purchase</h2>
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
