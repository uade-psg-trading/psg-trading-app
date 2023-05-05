import { apiEndpoints, type Balance, type FiatBalance, type Token } from '$lib/api';
import type { LayoutServerLoad } from './$types';

type PortfolioPageLoad = {
  tokens: Token[];
  portfolioBalance: Balance[];
  fiatBalance?: FiatBalance;
  portfolioError: string | undefined;
  tokensError: string | undefined;
  fiatBalanceError: string | undefined;
};

export const load = (async ({ parent }): Promise<PortfolioPageLoad> => {
  const parentValues = await parent();
  const jwt = parentValues.session;
  const [tokens, balance, fiatBalance] = await Promise.all([
    getAllTokens(jwt),
    getPortfolioBalance(jwt),
    getFiatBalance(jwt)
  ]);

  return {
    ...parentValues,
    portfolioBalance: balance.data,
    fiatBalance: fiatBalance.data,
    tokens: tokens.data,
    portfolioError: balance.message,
    tokensError: tokens.message,
    fiatBalanceError: fiatBalance.message
  };
}) satisfies LayoutServerLoad;

async function getAllTokens(jwt: string) {
  const result = await apiEndpoints.tokenList.getTokenList(jwt ?? '');
  if (result.success) {
    return { message: undefined, data: result.data || [] };
  }

  return { message: result.message, data: [] };
}

async function getPortfolioBalance(jwt: string) {
  const result = await apiEndpoints.balance.getBalances(jwt ?? '');
  if (result.success) {
    return { message: undefined, data: result.data || [] };
  }

  return { message: result.message, data: [] };
}

async function getFiatBalance(jwt: string) {
  const result = await apiEndpoints.balance.getFiat(jwt ?? '');
  if (result.success) {
    return { message: undefined, data: result.data };
  }

  return { message: result.message };
}
