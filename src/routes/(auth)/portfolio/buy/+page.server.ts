import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

type BuyForm = {
  amount: string;
  tokenSelection: string;
};

export const actions: Actions = {
  default: async ({ cookies, locals, request }) => {
    const formData = await request.formData();
    const buyForm = Object.fromEntries(formData) as BuyForm;
    const errors: Record<string, unknown> = {};

    if (Object.keys(errors).length > 0) {
      return fail(400, errors);
    }
    const jwt = getCurrentSession(cookies, locals);
    if (jwt == null) {
      return fail(400, {
        errors: {
          message: 'Error with token'
        }
      });
    }
    const createTransactionResponse = await apiEndpoints.transaction.createTransaction(jwt, 'buy', {
      token: buyForm.tokenSelection.replace('$', ''),
      quantity: Number(buyForm.amount)
    });
    if (createTransactionResponse.success) {
      return {};
    }

    return fail(400, {
      errors: {
        message: createTransactionResponse.message
      }
    });
  }
};
