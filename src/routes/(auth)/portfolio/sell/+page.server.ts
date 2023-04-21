import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

type SellForm = {
  amount: string;
  tokenSelection: string;
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
  default: async ({ cookies, locals, request }) => {
    const formData = await request.formData();
    const sellForm = Object.fromEntries(formData) as SellForm;
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
    } else {
      const createTransactionResponse = await apiEndpoints.transaction.createTransaction(jwt, {
        token: sellForm.tokenSelection,
        quantity: sellForm.amount,
        price: '100',
        balance: '100',
        operation: 'SELL'
      });
      if (createTransactionResponse) {
        throw redirect(303, '/');
      }
    }
  }
};
