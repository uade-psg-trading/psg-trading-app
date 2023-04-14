import { unauthenticatedPost, authenticatedGet } from './calls';

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
  get: async (jwt: string) => {
    const userApi = await authenticatedGet<User>('/api/users', jwt);

    if (userApi.success) {
      return userApi.data;
    }

    return null;
  },
  createUser: async (newUser: NewUser) => {
    const userApi = await unauthenticatedPost<User>('/api/users', newUser);

    if (userApi.success) {
      return userApi.data;
    }

    return null;
  }
};
