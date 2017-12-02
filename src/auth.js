/* global fetch */
import { toJSON } from './utils';

function authorization(clientID, clientSecret) {
  const url = 'https://accounts.spotify.com/api/token?grant_type=client_credentials';
  const basic = new Buffer(`${clientID}:${clientSecret}`).toString('base64');
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
      this.updateToken(res.access_token);
      return res;
    })
    .catch(error => console.log(error));
}


export default function auth() {
  const { clientID, clientSecret } = this;
  try {
    if (!clientID) throw Error('Set clientID');
    if (!clientSecret) throw Error('Set clientSecret');
  } catch (error) {
    console.error(error);
  }

  return {
    authorization: authorization.bind(this, clientID, clientSecret),
  };
}
