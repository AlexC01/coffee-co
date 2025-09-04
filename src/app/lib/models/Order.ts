import type { Timestamp } from 'firebase/firestore';
import type { CartItems } from './Cart';

export interface OrderTableInterface extends OrderInterface {
	totalItems: number;
}

export interface OrderInterface {
	amount: number;
	createdAt: string;
	currency: string;
	orderId: string;
	status: string;
	userId: string;
	items: CartItems;
}

export interface OrderInterfaceResponse {
	amount: number;
	createdAt: Timestamp;
	currency: string;
	orderId: string;
	status: string;
	userId: string;
	items: CartItems;
}
