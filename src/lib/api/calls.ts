import { apiCall } from './common';

export const authenticatedGet = async <T>(url: string, jwt: string) => {
  return apiCall<T>({
    url,
    method: 'GET',
    jwt
  });
};

export const authenticatedPost = async <T>(
  url: string,
  jwt: string,
  body: Record<string, unknown>
) => {
  return apiCall<T>({
    url,
    method: 'POST',
    jwt,
    body
  });
};

export const authenticatedPut = async <T>(
  url: string,
  jwt: string,
  body: Record<string, unknown>
) => {
  return apiCall<T>({
    url,
    method: 'PUT',
    jwt,
    body
  });
};

export const authenticatedDelete = async <T>(url: string, jwt: string) => {
  return apiCall<T>({
    url,
    method: 'DELETE',
    jwt
  });
};

export const authenticatedPatch = async <T>(
  url: string,
  jwt: string,
  body: Record<string, unknown>
) => {
  return apiCall<T>({
    url,
    method: 'PATCH',
    jwt,
    body
  });
};

export const unauthenticatedPost = async <T>(url: string, body: Record<string, unknown>) => {
  return apiCall<T>({
    url,
    method: 'POST',
    body
  });
};
