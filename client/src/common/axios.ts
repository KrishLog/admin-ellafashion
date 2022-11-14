import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

export const axiosInstance = axios.create({
  baseURL: 'http:localhost:3030/',
});

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const inc = (mod: any) => setCounter((c) => c + mod);

    const handleRequest = (config: any) => (inc(1), config);
    const handleResponse = (response: any) => (inc(-1), response);
    const handleError = (error: any) => (inc(-1), Promise.reject(error));

    // add request interceptors
    const reqInterceptor = axiosInstance.interceptors.request.use(handleRequest, handleError);
    // add response interceptors
    const resInterceptor = axiosInstance.interceptors.response.use(handleResponse, handleError);
    return () => {
      // remove all intercepts when done
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return counter > 0;
};

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = localStorage.getItem('token');
  if (token) {
    (config.headers ??= {})['Authorization'] = `Bearer ${token}`;
  }
  (config.headers ??= {})['Content-Type'] = 'application/json';
  return config;
}
/**
 * Catch the AunAuthorized Request
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = window.location.origin + `/login`;
    } else {
      throw error;
    }
  }
);

axiosInstance.interceptors.request.use(authRequestInterceptor);
