import z from 'zod';

const registrationSchema = z.object({
	userName: z.string().nonempty('Please fill username'),
	firstName: z.string().nonempty('Please fill first name'),
	lastName: z.string().nonempty('Please fill last name'),
	email: z.email('Please insert a valid email address'),
	password: z
		.string()
		.min(8, 'Your password should be at least 8 characters')
		.regex(
			/[a-zæøå]/,
			'Your password should include at least one lowercase letter'
		)
		.regex(
			/[A-ZÆØÅ]/,
			'Your password should include at least one uppercase letter'
		)
		.regex(/[\d]/, 'Your password should include at least one number')
		.regex(
			/[\W]/,
			'Your password should include at least one special character'
		),
	confirmPassword: z.string().nonempty('Please confirm password'),
	birthday: z.date(), //I need to update this later
	phone: z.coerce
		.number('Your phone number can only be numbers')
		.min(10000000, 'Your phone number has to be 8 characters'),
	address: z.string().min(5, 'Your address has to be at least 5 characters'),
	zip: z.coerce
		.number()
		.gte(4, 'Your zip-code should be 4 characters')
		.lte(4, 'Your zip-code should be 4 characters')
		.positive('Your zip-code should be 4 characters'),
	country: z.enum(
		['Denmark', 'Sweden', 'Norway'],
		'Please choose: Denmark, Sweden or Norway'
	),
	newsletter: z.boolean().optional(), //Update this later
	profileText: z.string().max(200).optional()
});

export default registrationSchema;
