/* global fetch */

import { HEADERS } from './utils';

export const wrapperFetch = url => fetch(url, HEADERS);
export const toJSON = data => data.json();
