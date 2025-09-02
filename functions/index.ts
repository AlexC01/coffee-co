import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2025-08-27.basil',
});

export const createOrderAfterPayment = functions.https.onRequest(
	async (req, res) => {
		const sig = req.headers['stripe-signature'] as string;
		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(
				req.rawBody,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET as string,
			);
		} catch (err) {
			console.error(
				`Webhook signature verification failed.`,
				(err as Error).message,
			);
			res.status(400).send(`Webhook Error: ${err}`);
			return;
		}

		if (event.type === 'payment_intent.succeeded') {
			const paymentIntent = event.data.object as Stripe.PaymentIntent;

			try {
				const cartItems = JSON.parse(paymentIntent.metadata.cart as string);
				const orderData = {
					orderId: paymentIntent.id,
					userId: paymentIntent.metadata.userId || 'guest_user',
					amount: paymentIntent.amount,
					currency: paymentIntent.currency,
					item: cartItems,
					status: 'succeeded',
					createdAt: admin.firestore.FieldValue.serverTimestamp(),
				};

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
