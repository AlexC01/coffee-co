import { doc, onSnapshot } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../firebase';
import type { CartItems } from '../models/Cart';

interface CartState {
	items: CartItems;
	isLoading: boolean;
	setCart: (items: CartItems) => void;
	subscribeToCart: (userId: string) => () => void;
}

export const useCartStore = create<CartState>()((set) => ({
	items: {},
	isLoading: true,
	setCart: (items) => set({ items, isLoading: false }),

	subscribeToCart: (userId) => {
		const cartRef = doc(db, 'carts', userId);

		const unsubscribe = onSnapshot(cartRef, (docSnap) => {
			if (docSnap.exists()) {
				const cart = docSnap.data() as { items: CartItems };
				set({ items: cart.items });
			} else set({ items: {} });
		});

		return unsubscribe;
	},
}));
