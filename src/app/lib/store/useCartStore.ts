import { doc, onSnapshot } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../firebase';
import type { CartItems } from '../models/Cart';

interface CartState {
	items: CartItems;
	isInitialized: boolean;
	setCart: (items: CartItems) => void;
	subscribeToCart: (userId: string) => () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
	items: {},
	isInitialized: false,
	setCart: (items) => set({ items, isInitialized: true }),

	subscribeToCart: (userId) => {
		const cartRef = doc(db, 'carts', userId);

		const unsubscribe = onSnapshot(cartRef, (docSnap) => {
			if (!get().isInitialized || docSnap.metadata.hasPendingWrites) {
				if (docSnap.exists()) {
					const cart = docSnap.data() as { items: CartItems };
					set({ items: cart.items, isInitialized: true });
				} else set({ items: {}, isInitialized: true });
			}
		});

		return unsubscribe;
	},
}));
