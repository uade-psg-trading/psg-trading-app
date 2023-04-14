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
      return loginApi.body;
    }

    return null;
  }
};

type User = {
  id: string;
  email: string;
};
export const user = {
  get: async (jwt: string) => {
    const userApi = await authenticatedGet<User>('/api/user', jwt);

    if (userApi.success) {
      return userApi.body;
    }

    return null;
  },
  createUser: async (email: string, password: string) => {
    const userApi = await unauthenticatedPost<User>('/api/user', {
      email,
      password
    });

    if (userApi.success) {
      return userApi.body;
    }

    return null;
  }
};
