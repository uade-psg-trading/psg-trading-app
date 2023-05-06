import { apiEndpoints, type Balance, type Token } from '$lib/api';
import type { LayoutServerLoad } from './$types';

type PortfolioPageLoad = {
  tokens: Token[];
  portfolioBalance: Balance[];
  portfolioError: string | undefined;
  tokensError: string | undefined;
};

export const load = (async ({ parent }): Promise<PortfolioPageLoad> => {
  const parentValues = await parent();
  const jwt = parentValues.session;
  const [tokens, balance] = await Promise.all([getAllTokens(jwt), getPortfolioBalance(jwt)]);

  return {
    ...parentValues,
    portfolioBalance: balance.data,
    tokens: tokens.data,
    portfolioError: balance.message,
    tokensError: tokens.message
  };
}) satisfies LayoutServerLoad;

async function getAllTokens(jwt: string) {
  const result = await apiEndpoints.tokens.get(jwt ?? '');
  if (result.success) {
    return { message: undefined, data: result.data || [] };
  }

  return { message: result.message, data: [] };
}

async function getPortfolioBalance(jwt: string) {
  const result = await apiEndpoints.balance.getBalanceList(jwt ?? '');
  if (result.success) {
    return { message: undefined, data: result.data || [] };
  }

  return { message: result.message, data: [] };
}
