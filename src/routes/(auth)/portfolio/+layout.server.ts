import { apiEndpoints, type Balance, type Token } from '$lib/api';
import type { LayoutServerLoad } from './$types';

type PortfolioPageLoad = {
  tokens: Token[];
  portfolioBalance: Balance[];
};

export const load = (async ({ parent }): Promise<PortfolioPageLoad> => {
  const parentValues = await parent();
  const jwt = parentValues.session;
  const [tokens, portfolioBalance] = await Promise.all([
    getAllTokens(jwt),
    getPortfolioBalance(jwt)
  ]);

  return {
    ...parentValues,
    portfolioBalance,
    tokens
  };
}) satisfies LayoutServerLoad;

async function getAllTokens(jwt: string) {
  const result = await apiEndpoints.tokenList.getTokenList(jwt ?? '');
  if (result.success) {
    return result.data || [];
  }

  return [];
}

async function getPortfolioBalance(jwt: string) {
  const balanceTokenList = await apiEndpoints.balance.getBalanceList(jwt ?? '');
  if (balanceTokenList.success) {
    return balanceTokenList.data || [];
  }

  return [];
}
