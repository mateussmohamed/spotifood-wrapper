/* global fetch */
import Cookies from "js-cookie";
import { toJSON } from "./utils";

export function unauthorized(resp) {
  return resp.error && resp.error.status === 401 ? true : false;
}

export function successOrError(res) {
  return unauthorized(res) ? this.request(url) : res;
}

export function request(url) {
  const token = Cookies.get("access_token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return fetch(url, options)
    .then(toJSON)
    .then(successOrError);
}
