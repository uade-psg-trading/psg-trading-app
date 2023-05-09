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
          price: `$ ${formatNumber(balance.price)}`,
          quantity: balance.amount.toFixed(0),
          variation: `${formatNumber(balance.percent_change_24h)}%`,
          yield: `$ ${formatNumber(balance.yield)}`,
          realYield: `$ ${formatNumber(balance.total)}`,
          alert: undefined
        };
      }),
      summary: {
        totalRealYield: formatNumber(totalRealYield),
        totalYield: formatNumber(totalYield)
      },
      dataset: {
        labels,
        labelsData
      },
      fiatBalance: formatNumber(fiatBalance?.amount)
    };
    return balanceData;
  }

  return {
    errors: {
      message: portfolioError
    }
  };
};
