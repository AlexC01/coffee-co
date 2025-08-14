import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import type { ColorsInterfaceResponse } from '../models/Colors';

export const getAllColors = async () => {
	try {
		const colorsCollection = collection(db, 'colors');
		const q = query(colorsCollection);

		const querySnapshot = await getDocs(q);

		const colorsAll = querySnapshot.docs.map((doc) => {
			const data = doc.data() as ColorsInterfaceResponse;

			return { ...data, id: doc.id };
		});

		return colorsAll;
	} catch (err) {
		console.error('Error while fetching colors', err);
		return [];
	}
};
