/* global fetch */
import Cookies from 'js-cookie';
import { toJSON } from './utils';
import { API_URL_TOKEN } from './config';

function refreshToken(ms, cb) {
  return setTimeout(() => cb() && refreshToken(ms, cb), ms);
}
function authorization() {
  const url = `${API_URL_TOKEN}?grant_type=client_credentials`;
  const basic = Buffer.from(`${this.clientID}:${this.clientSecret}`).toString('base64');
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
  };

  return fetch(url, opts)
    .then(toJSON)
    .then((res) => {
      Cookies.set('access_token', res.access_token, { expires: 1, path: '' });
      refreshToken(this.refreshTokenTime, this.auth.authorization);
      return res;
    })
    .catch(error => console.error(error));
}

export default function auth() {
  return {
    authorization: authorization.bind(this),
    // refreshToken: refreshToken.bind(this),
  };
}
