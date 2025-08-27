import * as z from 'zod';

export const authSchema = z.object({
	email: z.email('Please enter a valid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
});

export type AuthFormData = z.infer<typeof authSchema>;

export const validateAuthForm = (data: { email: string; password: string }) => {
	const result = authSchema.safeParse(data);

	if (result.success)
		return { success: true as const, data: result.data, errors: {} as const };

	const newErrors: { [key: string]: string } = {};
	result.error.issues.forEach((err) => {
		const fieldName = err.path[0] as string;
		if (!newErrors[fieldName]) newErrors[fieldName] = err.message;
	});

	return { success: false as const, data: null, errors: newErrors };
};
