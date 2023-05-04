import { apiEndpoints, type Token } from '$lib/api';
import type { LayoutServerLoad } from './$types';

type PortfolioPageLoad = {
  tokens: Token[];
};

export const load = (async ({ parent }): Promise<PortfolioPageLoad> => {
  const parentValues = await parent();
  const jwt = parentValues.session;
  const result = await apiEndpoints.tokenList.getTokenList(jwt ?? '');
  if (result.success) {
    const tokens = result.data || [];
    return { ...parentValues, tokens };
  }

  return {
    ...parentValues,
    tokens: []
  };
}) satisfies LayoutServerLoad;
