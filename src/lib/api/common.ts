import { getEndpoints } from '../config';

const getHeaders = {
  Accept: 'application/json'
};

const postHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*'
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
  data?: T;
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
        ...(['POST', 'PUT'].includes(method) ? postHeaders : getHeaders),
        ...((jwt && { Authorization: `Bearer ${jwt}` }) || {})
      },
      body: body && JSON.stringify(body)
    });

    if (response.status === 401) {
      return {
        success: false,
        message: 'Lo que estas buscando parece que no existe'
      };
    }
    const responseMessage = (await response.json()) as BasicResponse<T>;
    if (!response.ok) {
      const message = responseMessage.message;
      if (response.status === 401) {
        return {
          success: false,
          message: 'Lo que estas buscando parece que no existe'
        };
      }

      throw new Error(response.statusText + ' message:' + message);
    }

    return responseMessage;
  } catch (error: any) {
    console.log('ApiCall Error', error);
    return {
      success: false,
      message: error?.message || 'Unknown error'
    };
  }
};
