import axios from 'axios';
// import store from './store';

const baseURL = 'http://localhost:3000';

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
  
};
