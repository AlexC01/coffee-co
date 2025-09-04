import {
	collection,
	type DocumentData,
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
