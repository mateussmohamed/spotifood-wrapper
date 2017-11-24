import { toJSON, wrapperFetch } from './utils';
import { API_URL } from './config';

export const getAlbum = (id) => {
  const url = `${API_URL}/albums/${id}`;
  return wrapperFetch(url).then(toJSON);
};

export const getAlbums = (ids) => {
  const url = `${API_URL}/albums?ids=${ids}`;
  return wrapperFetch(url).then(toJSON);
};

export const getAlbumTracks = (id) => {
  const url = `${API_URL}/albums/${id}/tracks`;
  return wrapperFetch(url).then(toJSON);
};
