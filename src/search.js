import { toJSON, wrapperFetch } from './utils';
import { API_URL } from './config';

export const search = (query, type) => {
  const url = `${API_URL}/search?q=${query}&type=${type}`;
  return wrapperFetch(url).then(toJSON);
};
export const searchArtists = query => search(query, 'artist');
export const searchAlbums = query => search(query, 'album');
export const searchTracks = query => search(query, 'track');
export const searchPlaylists = query => search(query, 'playlist');
