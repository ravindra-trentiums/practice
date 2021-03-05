import axios from 'axios';
// import store from './store';

const baseURL = 'https://devapi.analytixlabs.co.in';

export const Api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Urls = {
  baseURL,
  login: '/secure/login',
  register: '/register',
  
};
