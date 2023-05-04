import { apiEndpoints } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
  const { session: jwt } = await parent();
  const transactionsResponse = await apiEndpoints.transaction.get(jwt);
  if (!transactionsResponse.success) {
    return {
      transactions: [],
      errors: transactionsResponse.message
    };
  }

  const transactions = transactionsResponse.data || [];
  console.log(transactions);
  return {
    transactions: transactions.map((transaction) => {
      return {
        id: transaction.id,
        tokenSymbol: transaction.token.symbol,
        tokenName: transaction.token.name,
        quantity: transaction.quantity,
        price: transaction.price,
        balance: transaction.balance,
        operation: transaction.operation === 'BUY' ? 'Compra' : 'Venta',
        transactionTime: new Date(transaction.transactionTime)
      };
    }),
    errors: undefined
  };
}) satisfies PageServerLoad;
