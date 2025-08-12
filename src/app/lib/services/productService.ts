import {
	collection,
	type DocumentData,
	getDocs,
	limit,
	type QuerySnapshot,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type {
	ProductInterface,
	ProductInterfaceResponse,
} from '../models/Products';

const transformData = (
	querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
): ProductInterface[] => {
	return querySnapshot.docs.map((doc) => {
		const data = doc.data() as ProductInterfaceResponse;
		const createdAt = data.createdAt.toDate().toISOString();

		return {
			...data,
			id: doc.id,
			createdAt,
		};
	});
};

export const getFeaturedProducts = async () => {
	try {
		const productsCollection = collection(db, 'products');
		const q = query(
			productsCollection,
			where('isFeatured', '==', true),
			limit(4),
		);

		const querySnapshot = await getDocs(q);

		return transformData(querySnapshot);
	} catch (err) {
		console.error('Error while fetching featured products', err);
		return [];
	}
};

export const getAllProducts = async () => {
	try {
		const productsCollection = collection(db, 'products');
		const q = query(productsCollection);

		const querySnapshot = await getDocs(q);

		return transformData(querySnapshot);
	} catch (err) {
		console.error('Error while fetching featured products', err);
		return [];
	}
};
