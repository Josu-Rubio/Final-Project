import Axios from 'axios';
import Querystring from 'querystring';

const API_URL = 'http://127.0.0.1:8000/apiv1';

export default {
  create: (name, email, password) => {
    let baseURL = `${API_URL}/user/`;
    return Axios.post(
      baseURL,
      Querystring.stringify({ name: name, email: email, password: password }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).then((res) => res);
  },
};
