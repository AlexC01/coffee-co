'use client';

import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase';
import type { OrderInterface } from '@/app/lib/models/Order';
import OrderDetail from '../Order/OrderDetail';

interface CheckoutSuccessProps {
	orderId: string;
}

const CheckoutSuccess = ({ orderId }: CheckoutSuccessProps) => {
	const [order, setOrder] = useState<OrderInterface | null>(null);
	const [loading, setLoading] = useState(false);
	const [timeoutExpired, setTimeoutExpired] = useState(false);

	useEffect(() => {
		if (!orderId) {
			setLoading(false);
			return;
		}

		const docRef = doc(db, 'orders', orderId as string);

		const loadingTimeout = setTimeout(() => {
			setTimeoutExpired(true);
			setLoading(false);
		}, 10000);

		const unsubscribe = onSnapshot(
			docRef,
			(docSnap) => {
				clearTimeout(loadingTimeout);
				if (docSnap.exists()) {
					setOrder(docSnap.data() as OrderInterface);
					setLoading(false);
				} else {
					console.log('Order not found yet...');
				}
			},
			(error) => {
				console.error('Error fetching order:', error);
				clearTimeout(loadingTimeout);
				setLoading(false);
			},
		);

		return () => {
			unsubscribe();
			clearTimeout(loadingTimeout);
		};
	}, [orderId]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p>Confirming your order...</p>
			</div>
		);
	}

	if (timeoutExpired || !order) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-red-500">
				<p className="text-xl">Order not found.</p>
				<p className="mt-2">
					Please verify your order ID or contact support for help.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="mt-10 text-center">
				<h2 className="text-3xl font-bold text-gray-600">Order Confirmed!</h2>
				<p className="text-lg mt-2">
					Thank you for your purchase. Your order details are below.
				</p>
			</div>
			<div className="mt-10">
				<OrderDetail order={order} />
			</div>
		</>
	);
};

export default CheckoutSuccess;
