import SpotifoodWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotifood = new SpotifoodWrapper({
  clientID: '24db18fe385c4ddfb9eb77bd70816b21',
  clientSecret: '49013f8eddb942499b71c3257d6e177b',
});

const albums = spotifood.search.albums('Post Malone');
albums.then(data => data.albums.items.map(item => console.log(item.name)));

const filters = { locale: 'pt_BR', country: 'BR' };

const playlists = spotifood.browser.featuredPlaylists(filters);

playlists.then(data => console.log(data));
