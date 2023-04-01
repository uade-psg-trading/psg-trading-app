import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { isValidEmail, isValidPassword } from '$lib/utils/validator';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  register: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const errors: Record<string, unknown> = {};
    if (!name) {
      errors.name = 'required';
    }

    if (!isValidEmail(email)) {
      errors.email = 'required';
    }

    if (!isValidPassword(password)) {
      errors.password = 'required';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'required';
    }

    if (Object.keys(errors).length > 0) {
      const returnData = {
        data: { name, email },
        errors
      };

      return fail(400, returnData);
    }

    // TODO register the user on BE.

    // TODO response
    return redirect(303, '/');
  }
};
