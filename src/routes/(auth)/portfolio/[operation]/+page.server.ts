import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { filterFiat } from '$lib/utils/helpers';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type BuySellForm = {
  operation: string;
  amount: string;
  tokenSelection: string;
};

export const load = (async ({ params, parent }) => {
  const operation = params.operation as 'buy' | 'sell';
  const { tokens, portfolioBalance, tokensError } = await parent();
  if (!tokensError) {
    if (operation === 'sell') {
      return {
        tokens: portfolioBalance.filter(filterFiat).map((balance) => {
          return {
            value: balance.symbol.symbol,
            label: balance.symbol.symbol
          };
        }),
        operation
      };
    } else {
      return {
        tokens: tokens.filter(filterFiat).map((token) => {
          return {
            value: token.symbol,
            label: token.symbol
          };
        }),
        operation
      };
    }
  }

  return { error: tokensError, operation };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ cookies, locals, request, params }) => {
    const formData = await request.formData();
    const operationForm = Object.fromEntries(formData) as BuySellForm;
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
