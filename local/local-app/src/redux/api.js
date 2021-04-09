import axios from 'axios';
import store from './store';

const baseURL = 'http://localhost:3006';
export const Api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Urls = {
  baseURL,
  login: '/login',
  register: '/register',
  blog: '/app/blog',
  comment: '/app/comment'
};

Api.interceptors.request.use((config) => {
  const {
    authentication
  } = store.getState();
  if (authentication.token) {
    config.headers.Authorization = `bearerAuth ${authentication.token}`;
  }
  return config;
});
