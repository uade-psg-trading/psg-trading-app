import { unauthenticatedPost, authenticatedGet, authenticatedPost } from './calls';

type Credentials = {
  jwt: string;
  refreshToken: string;
};
export const session = {
  login: async (email: string, password: string) => {
    const loginApi = await unauthenticatedPost<Credentials>('/api/session', {
      email,
      password
    });

    if (loginApi.success) {
      return loginApi.data;
    }

    return null;
  }
};

type User = {
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  location: {
    country: string;
    direction: string;
    city: string;
    province: string;
    zipCode: string;
  };
};

type NewUser = {
  password: string;
} & User;
export const user = {
  get: async (jwt: string) => await authenticatedGet<User>('/api/users', jwt),
  createUser: async (newUser: NewUser) => await unauthenticatedPost<User>('/api/users', newUser)
};

type Transaction = {
  id: string;
  transactionTime: string;
} & NewTransaction;

type NewTransaction = {
  token: string;
  quantity: number;
  price: number;
  balance: number;
  operation: string;
};
// TODO: Sacar external id
export const transaction = {
  createTransaction: async (jwt: string, newTransaction: NewTransaction) => {
    const createTransaction = await authenticatedPost<Transaction>(
      '/api/transaction/adaa7718-faad-4803-92c9-d9c4d365f221',
      jwt,
      newTransaction
    );
    if (createTransaction.success) {
      return createTransaction.data;
    }

    return null;
  }
};
