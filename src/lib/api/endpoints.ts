import { unauthenticatedPost, authenticatedGet, authenticatedPost } from './calls';

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
};
export const transaction = {
  createTransaction: async (jwt: string, operation: string, newTransaction: NewTransaction) =>
    await authenticatedPost<Transaction>(`/api/transaction/${operation}`, jwt, newTransaction)
};

type Payment = {
  amount: number;
  paymentMethod: string;
};
export const payments = {
  createPayment: async (jwt: string, newPayment: Payment) =>
    await authenticatedPost<Payment>('/api/payments', jwt, newPayment)
};
