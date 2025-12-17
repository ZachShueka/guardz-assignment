import axios, { type AxiosError, type AxiosResponse } from 'axios';

export type ApiError = {
  status?: number;
  message: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const normalizeError = (error: AxiosError): ApiError => {
  if (error.response) {
    const { status, data } = error.response;
    let message = 'An error occurred';

    if (data && typeof data === 'object') {
      if (Array.isArray((data as { message?: unknown }).message)) {
        const messages = (data as { message: string[] }).message
          .filter((msg): msg is string => typeof msg === 'string')
          .map((msg) => msg.charAt(0).toUpperCase() + msg.slice(1));
        message = messages.length > 0 ? messages.join('. ') : message;
      } else if (typeof (data as { message?: unknown }).message === 'string') {
        message = (data as { message: string }).message;
      }
    }

    return { status, message };
  }

  if (error.request) {
    if (error.code === 'ECONNABORTED') {
      return { message: 'Request timed out. Please check your connection and try again.' };
    }
    return { message: 'Unable to connect to the server. Please check your internet connection.' };
  }

  return { message: error.message || 'An unexpected error occurred' };
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(normalizeError(error));
  }
);







