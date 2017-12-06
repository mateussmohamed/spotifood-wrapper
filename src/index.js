import auth from './auth';
import album from './album';
import browse from './browse';
import search from './search';
import { request } from './request';

import { API_URL, REFRESH_TOKEN_TIME } from './config';

export default function SpotifoodWrapper(options) {
  this.apiURL = API_URL;
  this.refreshTokenTime = options.refreshTokenTime || REFRESH_TOKEN_TIME;
  this.clientID = options.clientID;
  this.clientSecret = options.clientSecret;

  this.album = album.bind(this)();
  this.auth = auth.bind(this)();
  this.browse = browse.bind(this)();
  this.request = request.bind(this);
  this.search = search.bind(this)();

  this.auth.authorization();
}
