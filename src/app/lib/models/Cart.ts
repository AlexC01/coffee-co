export interface CartItem {
	color: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	slug: string;
	size: string;
}

export type CartItems = Record<string, CartItem>;

export interface CartInterface {
	items: CartItems;
	lastUpdated: string;
}
