import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type operationForm = {
  operation: string;
  amount: string;
  tokenSelection: string;
};

export const load = (async ({ locals, cookies, params }) => {
  const operation = params.operation;
  const jwt = getCurrentSession(cookies, locals);
  const generalTokenList = await apiEndpoints.tokenList.getTokenList(jwt ?? '');
  const balanceTokenList = await apiEndpoints.balance.getBalanceList(jwt ?? '');
  if (generalTokenList.success && balanceTokenList.success) {
    const clientTokensSymbol = balanceTokenList.data?.map((balance) => balance.symbol);
    return { generalTokens: generalTokenList.data, operation, clientTokens: clientTokensSymbol };
  }
  return { error: generalTokenList.message, operation };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ cookies, locals, request, params }) => {
    const formData = await request.formData();
    const operationForm = Object.fromEntries(formData) as operationForm;
    const errors: Record<string, unknown> = {};
    const operationAPI = params.operation;
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
      operationAPI,
      {
        token: operationForm.tokenSelection,
        quantity: Number(operationForm.amount)
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
