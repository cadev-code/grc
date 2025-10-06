import { axiosClient } from '@/lib';

export const fetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axiosClient.get<T>(url);
  return data;
};

export const poster = async <T, B = unknown>(
  url: string,
  body?: B,
): Promise<T> => {
  // B para el tipado opcional del body
  const { data } = await axiosClient.post<T>(url, body);
  return data;
};

export const putter = async <T, B = unknown>(
  url: string,
  body: B,
): Promise<T> => {
  const { data } = await axiosClient.put<T>(url, body);
  return data;
};

export const deleter = async <T>(url: string): Promise<T> => {
  const { data } = await axiosClient.delete<T>(url);
  return data;
};
