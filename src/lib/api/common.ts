import { getEndpoints } from '../config';

const getHeaders = {
  Accept: 'application/json'
};

const postHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
};

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
type Body = Record<string, unknown>;
type ApiCallArgs = {
  url: string;
  method: Method;
  jwt?: string;
  body?: Body;
};

type BasicResponse<T> = {
  success: boolean;
  message?: string;
  body?: T;
};
export const apiCall = async <T>({
  url,
  method,
  jwt,
  body
}: ApiCallArgs): Promise<BasicResponse<T>> => {
  const { api: apiUrl } = getEndpoints();
  let absoluteUrl = url;
  if (!url.startsWith('/')) {
    absoluteUrl = `/${url}`;
  }

  const fullUrl = `${apiUrl}${absoluteUrl}`;
  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        ...(method === 'POST' ? postHeaders : getHeaders),
        ...((jwt && { Authorization: `${jwt}` }) || {})
      },
      body: body && JSON.stringify(body)
    });

    console.log(`method ${method}. Responses: ${JSON.stringify(response)}`);
    if (!response.ok) {
      if (response.status === 401) {
        console.log('Unauthorized');
        throw new Error('Unauthorized');
      }

      console.log('ApiCall Error', response);
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error: any) {
    console.log('ApiCall Error', error);
    return {
      success: false,
      message: error?.message || 'Unknown error'
    };
  }
};
