import type { TenantType } from '$lib/tenant-manager';
import {
  unauthenticatedPost,
  authenticatedGet,
  authenticatedPost,
  authenticatedPut
} from './calls';
import type {
  Alert,
  AlertOperator,
  Balance,
  Credentials,
  FiatBalance,
  Payment,
  Token,
  User
} from './types';

export const session = {
  login: async (email: string, password: string) =>
    await unauthenticatedPost<Credentials>('/api/session', {
      email,
      password
    }),
  validateGoogleToken: async (token: string, tenant: TenantType) =>
    await unauthenticatedPost<Credentials>('/api/session/google', { token, tenant })
};

type UserWithSecureData = {
  password: string;
} & User;

export const user = {
  me: async (jwt: string) => await authenticatedGet<User>('/api/users/me', jwt),
  createUser: async (newUser: UserWithSecureData) =>
    await unauthenticatedPost<User>('/api/users', newUser),
  updateUser: async (jwt: string, updatedUser: UserWithSecureData) =>
    await authenticatedPut<User>('/api/users', jwt, updatedUser)
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

export const payments = {
  createPayment: async (jwt: string, newPayment: Payment) =>
    await authenticatedPost<Payment>('/api/payments', jwt, newPayment)
};

export const tokenList = {
  getTokenList: async (jwt: string) => await authenticatedGet<Token[]>('/api/coin', jwt)
};

export const balance = {
  getBalanceList: async (jwt: string) => await authenticatedGet<Balance[]>('/api/balances', jwt),
  getFiatBalance: async (jwt: string) =>
    await authenticatedGet<FiatBalance>('/api/balances/fiat', jwt)
};

type NewAlert = {
  operator: AlertOperator;
  token: string;
  amount: number;
};
export const alerts = {
  get: async (jwt: string) => await authenticatedGet<Alert[]>('/api/alert', jwt),
  create: async (jwt: string, newAlert: NewAlert) =>
    await authenticatedPost<Alert>('/api/alert', jwt, newAlert)
};
