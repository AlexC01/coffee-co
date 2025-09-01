import { useMemo } from 'react';
import { useCartStore } from '../lib/store/useCartStore';

const useCartItemsSortPrice = () => {
	const { items } = useCartStore();

	const sortedCarItems = useMemo(() => {
		const cartItemsArray = Object.entries(items);
		cartItemsArray.sort(([idA, a], [idB, b]) => {
			const nameComparison = a.name.localeCompare(b.name);
			if (nameComparison !== 0) return nameComparison;

			return idA.localeCompare(idB);
		});
		return cartItemsArray;
	}, [items]);

	const subTotal = useMemo(() => {
		if (!items) return 0;

		return Object.values(items).reduce(
			(total, item) => total + item.quantity * item.price,
			0,
		);
	}, [items]);

	return { sortedCarItems, subTotal };
};

export default useCartItemsSortPrice;
