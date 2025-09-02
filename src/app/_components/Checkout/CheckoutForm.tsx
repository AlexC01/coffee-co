/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import useCartItemsSortPrice from '@/app/hooks/useCartItemsSortPrice';
import CheckoutPaymentForm from './CheckoutPaymentForm';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const CheckoutPage = () => {
	const [clientSecret, setClientSecret] = useState('');
	const { subTotal } = useCartItemsSortPrice();

	const handlePaymentIntent = async () => {
		try {
			const resp = await fetch('/api/create-payment-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: subTotal + 5 }),
			});

			const response = await resp.json();

			setClientSecret(response.clientSecret as string);
		} catch (err) {
			console.error('There was an error');
		}
	};

	useEffect(() => {
		if (subTotal !== 0) handlePaymentIntent();
	}, [subTotal]);

	const options: StripeElementsOptions = { clientSecret };

	return (
		<div className="col-span-2">
			<div className="w-full ">
				{clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutPaymentForm clientSecret={clientSecret} />
					</Elements>
				)}
				{!clientSecret && (
					<div className="text-center">Loading Checkout...</div>
				)}
			</div>
		</div>
	);
};

export default CheckoutPage;
