'use client';

import Image from 'next/image';
import type { OrderInterface } from '@/app/lib/models/Order';

interface OrderDetailProps {
	order: OrderInterface;
}

const OrderDetail = ({ order }: OrderDetailProps) => {
	const { orderId, items, createdAt, amount, status } = order;
	const date = new Date(createdAt).toLocaleString();
	const orderItems = Object.entries(items);

	const transformColorName = (value: string) => {
		return value
			.split('-')
			.map((item) => {
				const firstLetter = item[0].toUpperCase();
				return `${firstLetter}${item.slice(1)}`;
			})
			.join(' ');
	};

	return (
		<div className="border border-dashed shadow-md bg-white rounded-md px-4 py-6">
			<div className="flex justify-between items-center">
				<h3 className="text-sm">{date}</h3>
				<h2 className="text-xl font-semibold text-center">
					Order ID: {orderId}
				</h2>
				<div className="border border-green-600 bg-green-100 rounded-full p-2">
					<p className="uppercase text-sm text-gray-800 font-bold">{status}</p>
				</div>
			</div>
			<hr className="opacity-30 mt-4" />
			<div className="mt-8 px-5 md:px-8">
				{orderItems.map(([id, item]) => (
					<div
						key={id}
						className="flex justify-between items-center flex-wrap mb-5"
					>
						<div className="flex items-center gap-3">
							<Image
								src={item.image}
								alt="Mug Image"
								width={100}
								height={100}
								className="rounded-md"
							/>

							<div className="flex flex-col">
								<h4 className="text-lg font-semibold mb-1">{item.name}</h4>
								<span className="text-sm text-gray-500">
									{item.size} / {transformColorName(item.color)}
								</span>
								<span className="text-sm font-medium text-gray-500 mt-1">
									(${item.price.toFixed(2)} / unit)
								</span>
							</div>
						</div>
						<p className="font-medium text-gray-700">
							Quantity: {item.quantity}
						</p>
						<p className="font-medium text-gray-700">
							Price: ${(item.price * item.quantity).toFixed(2)}
						</p>
					</div>
				))}
			</div>
			<hr className="opacity-30 mt-10" />
			<div className="mt-8 px-5 md:px-8">
				<div className="flex justify-between items-center ">
					<p className="font-medium text-lg">Subtotal</p>
					<p>${(amount - 5).toFixed(2)}</p>
				</div>
				<div className="flex justify-between items-center mt-8">
					<p className="font-medium text-lg">Shipping</p>
					<p>$5.00</p>
				</div>
				<hr className="mt-4 opacity-30" />
				<div className="flex justify-between items-center mt-8">
					<p className="font-bold text-lg">Total</p>
					<p className="font-bold">${amount.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
