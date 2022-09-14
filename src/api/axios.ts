import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://zti-bookweb-be.herokuapp.com/api',
});
