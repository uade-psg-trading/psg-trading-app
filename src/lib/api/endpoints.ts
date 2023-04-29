import {
  unauthenticatedPost,
  authenticatedGet,
  authenticatedPost,
  authenticatedPut
} from './calls';

type Credentials = {
  username: string;
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
  },
  validateGoogleToken: async (token: string, tenant: string) =>
    await unauthenticatedPost<Credentials>('/api/session/google', { token, tenant })
};

type User = {
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  location: {
    country: string;
    address: string;
    city: string;
    province: string;
    zipCode: string;
  };
};

type FullUser = {
  password: string;
} & User;
// TODO: Sacar user id
export const user = {
  get: async (jwt: string) => await authenticatedGet<User>('/api/users/1', jwt),
  createUser: async (newUser: FullUser) => await unauthenticatedPost<User>('/api/users', newUser),
  updateUser: async (jwt: string, user: FullUser) =>
    await authenticatedPut<User>('/api/users/1', jwt, user)
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
