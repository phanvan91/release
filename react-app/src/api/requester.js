import axios from 'axios';
import config from 'config'

const BASE_URL = config.api.url

export function setupAxios() {
  axios.defaults.baseURL = `${BASE_URL}/api/`;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common.Authorization =
  //   'Bearer ' + localStorage.getItem('token');

  axios.interceptors.response.use(
    (res) => {
      // Add configurations here
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

export function setAxiosToken(token) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token;
}

export function removeAxiosToken() {
  localStorage.removeItem('token')
  axios.defaults.headers.common.Authorization = '';
}

const responseBody = res => res.data;

const requester = {
  get: (url, params, config = {}) =>
    axios
      .get(url, {
        params,
        ...config
      })
      .then(responseBody),

  post: (url, data, config = {}) =>
    axios.post(url, data, config).then(responseBody),
  put: (url, data) => axios.put(url, data).then(responseBody),
  delete: url => axios.delete(url).then(responseBody)
};

export default requester;
