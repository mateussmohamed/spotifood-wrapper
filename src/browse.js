import { parseURL } from './utils';

function featuredPlaylists(filters) {
  return this.request(parseURL(`${this.apiURL}/browse/featured-playlists`, filters));
}
export default function browse() {
  return {
    featuredPlaylists: featuredPlaylists.bind(this),
  };
}
