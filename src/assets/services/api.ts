import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://200.169.68.106:9999/api/product ',
  timeout: 30000,
})