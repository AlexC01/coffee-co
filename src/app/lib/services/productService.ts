import {
	collection,
	type DocumentData,
	getDocs,
	limit,
	OrderByDirection,
	orderBy,
	type QuerySnapshot,
	query,
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
) => {
	try {
		const productsCollection = collection(db, 'products');

		let q = query(productsCollection, limit(10));

		const { sortBy, price_max, price_min, search, colors } = searchParams;

		if (sortBy) {
			if (sortBy === 'featured') q = query(q, orderBy('isFeatured'));
			else
				q = query(q, orderBy('price', sortBy === 'price-asc' ? 'asc' : 'desc'));
		}

		if (price_min) q = query(q, where('price', '>=', price_min));
		if (price_max) q = query(q, where('price', '<=', price_max));

		if (colors)
			q = query(q, where('colors', 'array-contains-any', colors.split(',')));

		console.log(colors);

		if (search) q = query(q, where('name', '==', search));

		const querySnapshot = await getDocs(q);

		return transformData(querySnapshot);
	} catch (err) {
		console.error('Error while fetching featured products', err);
		return [];
	}
};
