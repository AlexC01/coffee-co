import { z } from 'zod';

export const productFilterSchema = z
	.object({
		search: z.string().optional(),
		colors: z.string().optional(),
		sortBy: z.enum(['featured', 'price-asc', 'price-desc']).optional(),
		minPrice: z.coerce.number().min(0).optional(),
		maxPrice: z.coerce.number().min(0).optional(),
	})
	.refine(
		(data) => {
			if (data.minPrice !== undefined && data.maxPrice !== undefined) {
				return data.minPrice <= data.maxPrice;
			}
			return true;
		},
		{
			message: 'Min price cannot be greater than max price.',
			path: ['maxPrice'],
		},
	);

export type ProductFilterParams = z.infer<typeof productFilterSchema>;
