import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotifyWrapper = new SpotifyWrapper({
  clientID: '24db18fe385c4ddfb9eb77bd70816b21',
  clientSecret: '49013f8eddb942499b71c3257d6e177b',
});

// spotifyWrapper.auth.authorization()
  // .then(data => console.log(data));

console.log(spotifyWrapper);

// const albums = spotifyWrapper.search.albums('Post Malone');

// albums.then(data => data.albums.items.map(item => console.log(item.name)));
