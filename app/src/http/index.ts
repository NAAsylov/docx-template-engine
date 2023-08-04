import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {getCookie, parseJWT, putCookie, setJWT} from "../helpers/cookie-helper";

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookie('access_token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const original_request = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      original_request._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
        setJWT(response.data.access_token, response.data.refresh_token);
        return $api.request(original_request);
      } catch (e) {
        alert('Не авторизован!');
      }
    }

    throw error;
  })

export default $api;
