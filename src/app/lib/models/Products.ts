import type { Timestamp } from 'firebase/firestore';

export interface ProductInterfaceResponse {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	images: string[];
	colors: string[];
	isFeatured: boolean;
	sizes: string[];
	createdAt: Timestamp;
}

export interface ProductInterface {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	images: string[];
	colors: string[];
	isFeatured: boolean;
	sizes: string[];
	createdAt: string;
}
