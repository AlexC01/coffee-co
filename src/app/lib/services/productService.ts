import {
	collection,
	type DocumentData,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	type QuerySnapshot,
	query,
	startAfter,
	where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type {
	ProductInterface,
	ProductInterfaceResponse,
	ProductsFiltersInterface,
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

export const getAllProducts = async (
	searchParams: ProductsFiltersInterface,
	lastVisibleId: string | null = null,
) => {
	try {
		const productsCollection = collection(db, 'products');

		let q = query(productsCollection, limit(5));

		const { sortBy, price_max, price_min, search, colors } = searchParams;

		if (sortBy) {
			if (sortBy === 'featured') q = query(q, orderBy('isFeatured'));
			else
				q = query(q, orderBy('price', sortBy === 'price-asc' ? 'asc' : 'desc'));
		}

		if (price_min) q = query(q, where('price', '>=', Number(price_min)));
		if (price_max) q = query(q, where('price', '<=', Number(price_max)));

		if (colors)
			q = query(q, where('colors', 'array-contains-any', colors.split(',')));

		if (search) q = query(q, where('name', '==', search));

		if (lastVisibleId) {
			const lastVisibleDoc = await getDoc(doc(db, 'products', lastVisibleId));
			q = query(q, startAfter(lastVisibleDoc));
		}

		const querySnapshot = await getDocs(q);

		const newData = transformData(querySnapshot);

		return {
			products: newData,
			lastVisibleId:
				querySnapshot.docs.length > 0
					? querySnapshot.docs[querySnapshot.docs.length - 1].id
					: null,
		};
	} catch (err) {
		console.error('Error while fetching featured products', err);
		return { products: [], lastVisible: null };
	}
};
