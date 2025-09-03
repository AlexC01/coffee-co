import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: Request) => {
	try {
		const { amount, cartItem } = await req.json();

		const cartId = JSON.stringify(cartItem);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
			description: 'Order from Coffee-Co',
			metadata: {
				cart: cartId,
			},
		});

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (err) {
		return NextResponse.json(
			{ error: (err as Error).message },
			{ status: 500 },
		);
	}
};
