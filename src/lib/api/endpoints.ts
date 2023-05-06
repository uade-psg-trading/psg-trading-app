import type { TenantType } from '$lib/tenant-manager';
import {
  unauthenticatedPost,
  authenticatedGet,
  authenticatedPost,
  authenticatedPut,
  authenticatedDelete
} from './calls';
import type { Alert, AlertOperator, Balance, Credentials, Payment, Token, User } from './types';

export const session = {
  login: async (email: string, password: string) =>
    await unauthenticatedPost<Credentials>('/api/session', {
      email,
      password
    }),
  validateGoogleToken: async (token: string, tenant: TenantType) =>
    await unauthenticatedPost<Credentials>('/api/session/google', { token, tenant })
};

type CreateUser = Pick<User, 'email' | 'location' | 'dni' | 'firstName' | 'lastName'> & {
  tenantId: string;
  password: string;
};
type UpdateUser = Pick<User, 'email' | 'location' | 'dni' | 'firstName' | 'lastName'>;
export const user = {
  me: async (jwt: string) => await authenticatedGet<User>('/api/users/me', jwt),
  create: async (newUser: CreateUser) => await unauthenticatedPost<User>('/api/users', newUser),
  update: async (jwt: string, updatedUser: UpdateUser) =>
    await authenticatedPut<User>('/api/users', jwt, updatedUser)
};

type Transaction = {
  id: number;
  token: Token;
  quantity: number;
  price: number;
  balance: number;
  operation: string;
  transactionTime: Date;
};

type NewTransaction = {
  token: string;
  quantity: number;
};

export const transaction = {
  get: async (jwt: string) => await authenticatedGet<Transaction[]>('/api/transaction', jwt),
  create: async (jwt: string, operation: string, newTransaction: NewTransaction) =>
    await authenticatedPost<Transaction>(`/api/transaction/${operation}`, jwt, newTransaction)
};

export const payments = {
  createPayment: async (jwt: string, newPayment: Payment) =>
    await authenticatedPost<Payment>('/api/payments', jwt, newPayment)
};

export const tokens = {
  get: async (jwt: string) => await authenticatedGet<Token[]>('/api/coin', jwt)
};

export const balance = {
  getBalanceList: async (jwt: string) => await authenticatedGet<Balance[]>('/api/balances', jwt)
};

type NewAlert = {
  operator: AlertOperator;
  token: string;
  amount: number;
};
export const alerts = {
  get: async (jwt: string) => await authenticatedGet<Alert[]>('/api/alert', jwt),
  create: async (jwt: string, newAlert: NewAlert) =>
    await authenticatedPost<Alert>('/api/alert', jwt, newAlert),
  delete: async (jwt: string, id: number) => await authenticatedDelete(`/api/alert/${id}`, jwt)
};
