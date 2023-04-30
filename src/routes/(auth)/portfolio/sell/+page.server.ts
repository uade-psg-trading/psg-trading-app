import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

type SellForm = {
  amount: string;
  tokenSelection: string;
};

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
    }
    const createTransactionResponse = await apiEndpoints.transaction.createTransaction(
      jwt,
      'sell',
      {
        token: sellForm.tokenSelection,
        quantity: Number(sellForm.amount)
      }
    );
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
