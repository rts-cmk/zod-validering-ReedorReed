import z from 'zod';

const registrationSchema = z
	.object({
		userName: z
			.string()
			.nonempty('Please fill username')
			.regex(
				/^[a-zæøåA-ZÆØÅ0-9_]+$/, //Validere på alt fra a-å i store og små bogstaver og tal fra 0-9 og underscore _
				'Please use only letters, numbers and underscore'
			),
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
		birthday: z.coerce.date('Please insert birthday').refine(
			(date) => {
				const today = new Date(); //Henter datoen for i dag
				const eighteenYearsAgo = new Date( //Regner 18 år tilbage baseret på år, måned, dag
					today.getFullYear() - 18,
					today.getMonth(),
					today.getDate()
				);
				return date <= eighteenYearsAgo;
			},
			{ message: 'You have to be 18+ to create a user' }
		),
		phone: z
			.string()
			.optional()
			.or(z.literal(''))
			.refine((value) => !value || /^\d{8,}$/.test(value), { //Tester værdien er 8 tal
				Message: 'Your phone number has to be at least 8 digits'
			}),
		address: z.string().min(5, 'Your address has to be at least 5 characters'),
		zip: z.coerce
			.number('Your zip-code has to be a number')
			.refine(
				(value) => `${value}`.length === 4, //Tester om værdiens længde er på præcist 4 tal
				'Your zip-code should be 4 characters'
			),
		country: z.preprocess(
			(value) => (typeof value === 'string' ? value.toLowerCase() : value), //Tester om værdien er en string hvis den er skal det gøres til små bogstaver
			z.enum(
				['denmark', 'sweden', 'norway'],
				'Please choose: Denmark, Sweden or Norway'
			)
		),
		newsletter: z.coerce.boolean().optional(),
		profileText: z
			.string()
			.max(200, 'Profile text can only be 200 characters')
			.optional()
	})
	.refine((input) => input.password === input.confirmPassword, {
		path: ['confirmPassword'],
		message: 'The passwords do not match'
	});

export default registrationSchema;
