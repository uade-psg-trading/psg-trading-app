import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type BuyForm = {
  amount: string;
  tokenSelection: string;
};
export const load: PageServerLoad = async ({ cookies, locals }) => {
  const jwt = getCurrentSession(cookies, locals);
  if (jwt == null) {
    return fail(400, {
      errors: {
        message: 'Error with token'
      }
    });
  }
  const coinsResponse = await apiEndpoints.coins.getCoinList(jwt);
  if (coinsResponse.success && coinsResponse.data) {
    return {
      tokenList: coinsResponse.data.filter((item) => item.token).map((item) => item.symbol)
    };
  }
  return fail(400, {
    errors: {
      message: coinsResponse.message
    }
  });
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
      token: buyForm.tokenSelection,
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
