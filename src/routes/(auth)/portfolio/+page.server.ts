import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { portfolioBalance, portfolioError } = await parent();
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
          price: `$ ${balance.price.toFixed(2)}`,
          quantity: balance.amount.toFixed(0),
          variation: `${balance.percent_change_24h.toFixed(2)}%`,
          yield: `$ ${balance.yield.toFixed(2)}`,
          realYield: `$ ${balance.total.toFixed(2)}`,
          alert: undefined
        };
      }),
      summary: {
        totalRealYield: totalRealYield.toFixed(2),
        totalYield: totalYield.toFixed(2)
      },
      dataset: {
        labels,
        labelsData
      }
    };
    return balanceData;
  }

  return {
    errors: {
      message: portfolioError
    }
  };
};
