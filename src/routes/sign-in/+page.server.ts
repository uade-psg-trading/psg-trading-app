import type { Actions } from './$types';
import { redirect, type Cookies } from '@sveltejs/kit';
import { createSession } from '$lib/server/stores/session-store';
import { isValidEmail, isValidPassword } from '$lib/utils/validator';
import { apiEndpoints } from '$lib/api';

function performLogin(cookies: Cookies, username: string, jwt: string) {
  const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
  const sessionJwt = createSession(username, maxAge, jwt);
  cookies.set('Auth', `${sessionJwt}`, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge
  });
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const valid = isValidEmail(email) && isValidPassword(password);
    if (valid) {
      const loginApi = await apiEndpoints.session.login(email, password);
      if (loginApi) {
        performLogin(cookies, email, loginApi.jwt);
        throw redirect(302, '/');
      }
    }

    return {
      email,
      errorMessage: 'El email o la contraseña no son correctos'
    };
  }
};
