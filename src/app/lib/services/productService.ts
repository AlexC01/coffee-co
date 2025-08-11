import {
	collection,
	type DocumentData,
	getDocs,
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
) => {
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

export const getFeaturedProducts = async (): Promise<ProductInterface[]> => {
	const productsCollection = collection(db, 'products');
	const q = query(productsCollection, where('isFeatured', '==', true));

	const querySnapshot = await getDocs(q);

	return transformData(querySnapshot);
};
