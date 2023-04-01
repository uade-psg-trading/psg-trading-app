import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('token') as string;
		const amount = formData.get('amount') as string;
		const errors: Record<string, unknown> = {};
		if (!token || !amount) {
			errors.name = 'required';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, errors);
		}

		return {
			message: 'Not implemented'
		};
	}
};
