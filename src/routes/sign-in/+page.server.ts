import type { Actions } from './$types';
import { redirect, type Cookies } from '@sveltejs/kit';
import { createSession } from '$lib/server/stores/session-store';
import { isValidEmail, isValidPassword } from '$lib/utils/validator';

function performLogin(cookies: Cookies, username: string) {
	const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
	const sid = createSession(username, maxAge);
	cookies.set('sid', sid, { maxAge });
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const valid = isValidEmail(email) && isValidPassword(password);
		console.log(`formData => email: ${email}, password: ${password}`);

		// TODO: Backend api call
		if (valid) {
			performLogin(cookies, email);
			throw redirect(302, '/');
		}

		return {
			email,
			errorMessage: 'Email or password is not valid'
		};
	}
};
