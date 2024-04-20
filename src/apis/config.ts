import axios from 'axios';

// export const BASE_API_URL = 'https://api.a.com';
export const BASE_API_URL =
  'https://5rf59007ej.execute-api.ap-northeast-2.amazonaws.com';

axios.defaults.baseURL = BASE_API_URL;
