/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type {
	OrderInterface,
	OrderTableInterface,
} from '@/app/lib/models/Order';
import { routes } from '@/app/lib/models/Routes';
import { getAllOrders } from '@/app/lib/services/ordersService';
import { useAuthStore } from '@/app/lib/store/authStore';
import LoadingSpinner from '../LoadingSpinner';

const OrderLayout = () => {
	const { user } = useAuthStore();
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState<OrderTableInterface[]>([]);

	const getTotalQuantity = (order: OrderInterface[]) => {
		const newArr: OrderTableInterface[] = order.map((item) => {
			const totalQuant = Object.values(item.items).reduce(
				(total, product) => total + product.quantity,
				0,
			);
			return { ...item, totalItems: totalQuant };
		});

		return newArr;
	};

	const getOrders = async () => {
		try {
			const resp = await getAllOrders(user?.uid ?? '');
			setOrders(getTotalQuantity(resp));
		} catch (err) {
			toast.error('Error while loading your orders');
			setOrders([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) getOrders();
	}, [user]);

	return (
		<>
			{loading && (
				<div className="flex flex-col items-center justify-center mt-15">
					<LoadingSpinner size="h-20 w-20" />
					<h2 className="mt-8 text-xl font-semibold text-gray-600">
						Loading your orders...
					</h2>
				</div>
			)}
			{!loading && orders.length === 0 && (
				<h2 className="text-2xl font-semibold text-center mt-15">
					You dont have any orders at the moment
				</h2>
			)}
			{!loading && orders.length > 0 && (
				<div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm mt-8">
					<table className="min-w-full divide-y-2 divide-gray-200">
						<thead className="ltr:text-left rtl:text-right">
							<tr className="font-medium *:text-gray-900">
								<th className="px-3 py-2 whitespace-nowrap">Order #</th>
								<th className="px-3 py-2 whitespace-nowrap">Date</th>
								<th className="px-3 py-2 whitespace-nowrap">Items</th>
								<th className="px-3 py-2 whitespace-nowrap">Amount</th>
								<th className="px-3 py-2 whitespace-nowrap">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{orders.map((order) => {
								const dateMod = new Date(order.createdAt).toLocaleString();
								return (
									<tr
										key={order.orderId}
										className="*:text-gray-900 *:first:font-medium"
									>
										<td className="px-3 py-2 whitespace-nowrap">
											<Link
												href={routes.checkout}
												className="text-gray-500 cursor-pointer hover:text-gray-600"
											>
												{order.orderId}
											</Link>
										</td>
										<td className="px-3 py-2 whitespace-nowrap">{dateMod}</td>
										<td className="px-3 py-2 whitespace-nowrap">
											{order.totalItems}
										</td>
										<td className="px-3 py-2 whitespace-nowrap">
											$ {order.amount.toFixed(2)}
										</td>
										<td className="px-3 py-2 whitespace-nowrap">
											<div className="border border-green-600 bg-green-100 rounded-full p-2 max-w-2/3 text-center">
												<p className="uppercase text-sm text-gray-800 font-bold">
													{order.status}
												</p>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default OrderLayout;
