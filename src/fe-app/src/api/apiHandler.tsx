import { apiError } from "./apiError";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';

const getAuthToken = () => sessionStorage.getItem('authToken');

function removeEmpty(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== '')
  );
}

type TCommon<T> = {
  url: string;
  transform?: (_res: T) => T;
  fetchOptions?: Omit<RequestInit, 'body' | 'method'>;
};
type TRequestOption =
  | {
      method: 'GET';
      params?: object;
    }
  | {
      method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      payload?: object;
    };

async function request<T>({
  method,
  url,
  transform,
  fetchOptions = {},
  ...rest
}: TCommon<T> & TRequestOption): Promise<T> {
  const token = getAuthToken();
  const { headers = {}, ...otherOptions } = fetchOptions;
  const hasParams = 'params' in rest;
  const hasPayload = 'payload' in rest;
  const p = new URLSearchParams(
    hasParams ? (removeEmpty(rest?.params as Record<string, string>)) : ''
  ).toString();
  const $params = hasParams && method === 'GET' ? p : undefined;
  const $url = $params ? `${url}?${$params}` : url;

  const response = await fetch(`${API_URL}${$url}`, {
    method,
    body: hasPayload && method !== 'GET' ? JSON.stringify(rest?.payload) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...otherOptions,
  });

  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new apiError(data.message || 'Request failed', response.status);
  }

  if (typeof transform === 'function') {
    return transform(data);
  }
  return data;
}

export async function post<T>({ url, payload, fetchOptions, transform }: TCommon<T> & { payload?: object }): Promise<T> {
  return request<T>({ method: 'POST', url, payload, fetchOptions, transform });
}

export async function get<T>({ url, params, fetchOptions, transform }: TCommon<T> & { params?: object }): Promise<T> {
  return request<T>({ method: 'GET', url, params: params ? removeEmpty(params) : {}, fetchOptions, transform });
}

export async function put<T>({ url, payload, fetchOptions, transform }: TCommon<T> & { payload?: object }): Promise<T> {
  return request<T>({ method: 'PUT', url, payload, fetchOptions, transform });
}

export async function patch<T>({ url, payload, fetchOptions, transform }: TCommon<T> & { payload?: object }): Promise<T> {
  return request<T>({ method: 'PATCH', url, payload, fetchOptions, transform });
}

export async function del<T>({ url, payload, fetchOptions, transform }: TCommon<T> & { payload?: object }): Promise<T> {
  return request<T>({ method: 'DELETE', url, payload, fetchOptions, transform });
}