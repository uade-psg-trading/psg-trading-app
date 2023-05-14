import { formatNumber } from '$lib/utils/helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { portfolioBalance, portfolioError, fiatBalance } = await parent();
  let totalYield = 0;
  let totalRealYield = 0;
  const labels: string[] = [];
  const labelsData: number[] = [];

  if (!portfolioError) {
    const balanceData = {
      balances: portfolioBalance.map((balance) => {
        totalYield += balance.yield;
        totalRealYield += balance.total;
        labels.push(balance.symbol.name);
        labelsData.push(balance.total);
        return {
          id: balance.symbol.symbol,
          name: balance.symbol.name,
          price: `$ ${formatNumber(balance.price || 0)}`,
          quantity: balance.amount.toFixed(0),
          variation: `${formatNumber(balance.percent_change_24h || 0)}%`,
          positiveVariation: balance.percent_change_24h > 0,
          yield: `$ ${formatNumber(balance.yield || 0)}`,
          positiveYield: balance.yield > 0,
          realYield: `$ ${formatNumber(balance.total || 0)}`,
          isAlerted: balance.isAlerted
        };
      }),
      summary: {
        totalRealYield: formatNumber(totalRealYield || 0),
        totalYield: formatNumber(totalYield || 0)
      },
      dataset: {
        labels,
        labelsData
      },
      fiatBalance: formatNumber(fiatBalance?.amount || 0)
    };
    return balanceData;
  }

  return {
    errors: {
      message: portfolioError
    }
  };
};
