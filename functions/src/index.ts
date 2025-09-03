import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import * as functions from 'firebase-functions';

import Stripe from 'stripe';

admin.initializeApp({ projectId: 'coffe-co' });

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
				const cartId = JSON.parse(paymentIntent.metadata.cart as string);
				const cartRef = admin.firestore().collection('carts').doc(cartId);
				const cartSnap = await cartRef.get();

				if (!cartSnap.exists) {
					res.status(404).send('Cart not found');
					return;
				}

				const cartData = cartSnap.data();

				const orderData = {
					orderId: paymentIntent.id,
					userId: cartId || 'guest_user',
					amount: paymentIntent.amount / 100,
					currency: paymentIntent.currency,
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
					status: 'succeeded',
					items: cartData?.items,
				};

				await getFirestore()
					.collection('orders')
					.doc(paymentIntent.id)
					.set(orderData);

				await cartRef.delete();

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
