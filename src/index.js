/* global fetch */
import auth from './auth';
import album from './album';
import browser from './browser';
import search from './search';

import { API_URL, REFRESH_TOKEN_TIME } from './config';
import { toJSON } from './utils';

class SpotifyWrapper {
  constructor(options) {
    this.apiURL = API_URL;
    this.refreshTokenTime = options.refreshTokenTime || REFRESH_TOKEN_TIME;
    this.clientID = options.clientID;
    this.clientSecret = options.clientSecret;
    this.token = null;

    this.refreshToken = this.refreshToken.bind(this);

    this.album = album.bind(this)();
    this.browser = browser.bind(this)();
    this.auth = auth.bind(this)();
    this.search = search.bind(this)();

    this.refreshToken();
  }

  static async init(options) {
    const instance = await this.cretateInstance(options);
    await instance.auth.authorization();
    return instance;
  }

  static async cretateInstance(options) {
    return new SpotifyWrapper(options);
  }

  refreshToken() {
    setTimeout(async () => {
      await this.auth.authorization();
      this.refreshToken();
    }, this.refreshTokenTime);
  }

  request(url) {
    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return fetch(url, options)
      .then(toJSON)
      .then((resp) => {
        if (resp.error && resp.error.status === 401) {
          this.refreshToken();
        }
        return resp;
      });
  }

  updateToken(token) {
    this.token = token;
  }
}

export default SpotifyWrapper;
