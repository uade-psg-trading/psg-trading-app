import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { filterFiat, formatNumber } from '$lib/utils/helpers';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type BuySellForm = {
  operation: string;
  amount: string;
  tokenSelection: string;
};

export const load = (async ({ url, params, parent }) => {
  const operation = params.operation as 'buy' | 'sell';
  let queryStringSymbol: string | undefined = url.searchParams.get('symbol') as string;
  const { tokens, portfolioBalance, tokensError, fiatBalance } = await parent();
  if (!tokens.some((token) => token.symbol === queryStringSymbol)) {
    queryStringSymbol = undefined;
  }

  if (!tokensError) {
    if (operation === 'sell') {
      return {
        tokens: portfolioBalance.filter(filterFiat).map((balance) => {
          return {
            value: balance.symbol.symbol,
            label: balance.symbol.symbol,
            symbolName: balance.symbol.name,
            price: balance.price || 0,
            variation: formatNumber(balance.percent_change_24h || 0),
            amount: balance.amount
          };
        }),
        operation,
        queryStringSymbol,
        fiatBalance: formatNumber(fiatBalance?.amount || 0)
      };
    } else {
      return {
        tokens: tokens.filter(filterFiat).map((token) => {
          return {
            value: token.symbol,
            label: token.symbol,
            symbolName: token.name,
            price: token.tokenPrice?.price || 0,
            variation: formatNumber(token.tokenPrice?.percentChange24h || 0),
            amount: 0
          };
        }),
        operation,
        queryStringSymbol,
        fiatBalance: formatNumber(fiatBalance?.amount || 0)
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

    const createTransactionResponse = await apiEndpoints.transaction.create(jwt, operationAPI, {
      token: operationForm.tokenSelection,
      quantity: Number(operationForm.amount)
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
