import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const jwt = getCurrentSession(cookies, locals);
  if (jwt == null) {
    return {
      errors: {
        message: 'Error with token'
      }
    };
  }

  const balanceResponse = await apiEndpoints.balance.getBalanceList(jwt);
  if (balanceResponse.success && balanceResponse.data) {
    return {
      balanceList: balanceResponse.data.map((balance) => {
        return {
          id: balance.symbol.symbol,
          name: balance.symbol.name,
          price: `$ ${balance.price.toFixed(2)}`,
          quantity: balance.amount.toFixed(0),
          variation: `${(balance.percent_change_24h * 100).toFixed(2)}%`,
          yield: `$ ${balance.yield.toFixed(2)}`,
          realYield: `$ ${balance.total.toFixed(2)}`,
          alert: undefined
        };
      })
    };
  }

  return {
    errors: {
      message: balanceResponse.message
    }
  };
};
