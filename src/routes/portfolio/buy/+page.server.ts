import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const amount = formData.get('amount') as string;
    const selectedToken = formData.get('tokenSelection') as string;
    const errors: Record<string, unknown> = {};
    if (!selectedToken || !amount) {
      errors.name = 'required';
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, errors);
    }

    return {
      message: selectedToken
    };
  }
};
