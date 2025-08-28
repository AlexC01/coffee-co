import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { CartInterface, CartItem } from '../models/Cart';

export const addProductToCart = async (
	item: CartItem,
	idProd: string,
	userId: string,
) => {
	try {
		const cartRef = doc(db, 'carts', userId);
		const cartSnap = await getDoc(cartRef);

		if (cartSnap.exists()) {
			const existingCart = cartSnap.data() as CartInterface;

			const exisitingItem = existingCart.items[idProd];

			if (exisitingItem) exisitingItem.quantity++;
			else existingCart.items[idProd] = item;

			existingCart.lastUpdated = new Date().toISOString();

			await setDoc(cartRef, existingCart);
		} else
			await setDoc(doc(db, 'carts', userId), {
				items: { [idProd]: item },
				lastUpdated: new Date().toISOString(),
			});
	} catch (err) {
		console.error('Error while adding product to the cart', err);
		throw err;
	}
};

export const removeProductFromCart = async (idProd: string, userId: string) => {
	try {
		const cartRef = doc(db, 'carts', userId);
		const cartSnap = await getDoc(cartRef);

		if (cartSnap) {
			const copyItems = cartSnap.data() as CartInterface;

			delete copyItems.items[idProd];

			await setDoc(cartRef, copyItems);
		} else {
			throw new Error('User did not have item on cart');
		}
	} catch (err) {
		console.error('Error while removing product from the cart', err);
		throw err;
	}
};

export const clearCart = async (userId: string) => {
	try {
		await deleteDoc(doc(db, 'carts', userId));
	} catch (err) {
		console.error('Error while clearing your cart');
		throw err;
	}
};
