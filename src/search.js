function searcher(type, query) {
  return this.request(`${this.apiURL}/search?q=${query}&type=${type}`);
}

function search() {
  return {
    artists: searcher.bind(this, 'artist'),
    albums: searcher.bind(this, 'album'),
    tracks: searcher.bind(this, 'track'),
    playlists: searcher.bind(this, 'playlist'),
  };
}

export default search;
