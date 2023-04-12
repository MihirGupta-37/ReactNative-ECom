import axios from 'axios';

const ApiManager = axios.create({
  baseURL: '',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager