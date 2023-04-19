import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const amount = formData.get('amount') as string;
    const fullName = formData.get('full_name') as string;
    const errors: Record<string, unknown> = {};
    if (!amount || !fullName) {
      errors.name = 'required';
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, errors);
    }

    return {
      message: fullName
    };
  }
};
