import { doc, getDoc, setDoc } from 'firebase/firestore';
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

		if (cartSnap) {
			const copyItems = cartSnap.data() as CartInterface;

			const exisitingItem = copyItems.items[idProd];

			if (exisitingItem) exisitingItem.quantity++;
			else copyItems.items[idProd] = item;

			await setDoc(cartRef, copyItems);
		} else await setDoc(cartRef, { items: { [idProd]: item } });
	} catch (err) {
		console.error('Error while adding product to the cart', err);
		throw err;
	}
};
