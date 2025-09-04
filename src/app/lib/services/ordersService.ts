import {
	collection,
	type DocumentData,
	doc,
	getDoc,
	getDocs,
	type QuerySnapshot,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { OrderInterface, OrderInterfaceResponse } from '../models/Order';

const transformData = (
	querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
): OrderInterface[] => {
	return querySnapshot.docs.map((doc) => {
		const data = doc.data() as OrderInterfaceResponse;
		const createdAt = data.createdAt.toDate().toISOString();

		return {
			...data,
			id: doc.id,
			createdAt,
		};
	});
};

export const getAllOrders = async (userId: string) => {
	try {
		const ordersRef = collection(db, 'orders');
		const q = query(ordersRef, where('userId', '==', userId));

		const querySnapshot = await getDocs(q);

		return transformData(querySnapshot);
	} catch (err) {
		console.error('Error while fetching featured products', err);
		return [];
	}
};

export const getSingleOrder = async (orderId: string) => {
	try {
		const orderRef = doc(db, 'orders', orderId);
		const orderSnap = await getDoc(orderRef);

		if (orderSnap.exists()) {
			const orderData = orderSnap.data() as OrderInterfaceResponse;
			const createdAt = orderData.createdAt.toDate().toISOString();
			const newObj = { ...orderData, createdAt } as OrderInterface;
			return newObj;
		}

		return null;
	} catch (err) {
		console.error('Error while getting the order', err);
		return null;
	}
};
