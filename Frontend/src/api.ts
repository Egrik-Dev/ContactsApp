import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const TIMEOUT = 5000;
const BACKEND_URL = `http://localhost:5001`;

export function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse): AxiosResponse => response;

  const onFail = (err: AxiosError): void => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
}
