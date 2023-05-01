import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { isValidEmail, isValidPassword } from '$lib/utils/validator';
import { apiEndpoints } from '$lib/api';
import { newSession } from '$lib/server/cookie-manager';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const valid = isValidEmail(email) && isValidPassword(password);
    if (valid) {
      const loginApi = await apiEndpoints.session.login(email, password);
      if (loginApi.success && loginApi.data) {
        const { jwt, username, tenant } = loginApi.data;
        newSession(cookies, username, jwt);
        throw redirect(302, '/api/tenant?tenant=' + tenant);
      }
    }

    return {
      email,
      errorMessage: 'El email o la contraseña no son correctos'
    };
  }
};
