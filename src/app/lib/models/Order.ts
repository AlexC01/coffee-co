import type { Timestamp } from 'firebase/firestore';
import type { CartItems } from './Cart';

export interface OrderInterface {
	amount: number;
	createdAt: Timestamp;
	currency: string;
	orderId: string;
	status: string;
	userId: string;
	items: CartItems;
}
