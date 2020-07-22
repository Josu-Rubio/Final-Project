import Axios from 'axios';
import Querystring from 'querystring';

import Session from '../models/Session';

const API_URL = 'http://127.0.0.1:8000/apiv1';

export default {
  login: (email, password) => {
    let baseURL = `${API_URL}/authenticate`;
    return Axios.post(
      baseURL,
      Querystring.stringify({ email: email, password: password }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then((res) => new Session(res.data.user));
  },

  logout: (jwt) => {
    let baseURL = `${API_URL}/authenticate/logout`;
    return Axios.post(baseURL, {
      headers: { Authorization: `Monolowana ${jwt}` },
    }).then((res) => 'JWT invalidated');
  },

  loginWithToken: (jwt) => {
    let baseURL = `${API_URL}/authenticate/checkjwt`;
    return Axios.post(baseURL, {
      headers: { Authorization: `Monolowana ${jwt}` },
    }).then((res) => new Session(res.data.user));
  },

  activate: (token) => {
    let baseURL = `${API_URL}/authenticate/activate/${token}`;
    return Axios.get(baseURL).then((res) => res);
  },

  resetRequest: (email) => {
    let baseURL = `${API_URL}/authenticate/reset`;
    return Axios.post(baseURL, Querystring.stringify({ email: email }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => res);
  },

  reset: (token, password) => {
    let baseURL = `${API_URL}/authenticate/reset/${token}`;
    return Axios.post(baseURL, Querystring.stringify({ password: password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((res) => res);
  },
};
