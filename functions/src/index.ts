import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';

admin.initializeApp();

let stripe: Stripe;
if (process.env.STRIPE_SECRET_KEY) {
	stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: '2025-08-27.basil',
	});
}

const enpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const createOrderAfterPayment = functions.https.onRequest(
	async (req, res) => {
		if (!stripe) {
			console.error(
				'Stripe client not initialized. Missing STRIPE_SECRET_KEY.',
			);
			res.status(500).send('Internal Server Error');
			return;
		}
		const sig = req.headers['stripe-signature'] as string;
		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(req.rawBody, sig, enpointSecret);
			console.log('Webhook event received and verified.');
		} catch (err) {
			console.error(
				'Webhook signature verification failed.',
				(err as Error).message,
			);
			res.status(400).send(`Webhook Error: ${err}`);
			return;
		}

		if (event.type === 'payment_intent.succeeded') {
			const paymentIntent = event.data.object as Stripe.PaymentIntent;

			try {
				console.log('Received payment intent with ID:', paymentIntent.id);
				const cartData = JSON.parse(paymentIntent.metadata.cart as string);
				console.log('Parsed cart data:', cartData);

				const cartItems = Object.values(cartData);
				console.log('Transformed cart items for Firestore:', cartItems);

				const orderData = {
					orderId: paymentIntent.id,
					userId: paymentIntent.metadata.userId || 'guest_user',
					amount: paymentIntent.amount,
					currency: paymentIntent.currency,
					status: 'succeeded',
					// createdAt: admin.firestore.FieldValue.serverTimestamp(),
				};

				console.log('Order data to be written:', orderData);

				await admin
					.firestore()
					.collection('orders')
					.doc(orderData.orderId)
					.set(orderData);

				console.log(
					`Order created successfully for PaymentIntent ID: ${orderData.orderId}`,
				);
				res.status(200).send('Order created successfully.');
				return;
			} catch (dbError) {
				console.error('Error writing order to Firestore: ', dbError);
				res.status(500).send('Error writing order to firestore');
				return;
			}
		}

		res.status(200).end();
	},
);
