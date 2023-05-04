import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals, parent }) => {
  const { portfolioBalance } = await parent();

  if (portfolioBalance.length > 0) {
    return {
      balanceList: portfolioBalance.map((balance) => {
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

  // return {
  //   errors: {
  //     message: balanceResponse.message
  //   }
  // };
};
