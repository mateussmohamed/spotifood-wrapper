import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotifyWrapper = new SpotifyWrapper({
  token: 'BQB3dooxjB7sn6lDto2XTcMtILN6QeowUn8MDmxmtr_PxCi3fNaEUkN6WcXQVKjdx2CeepC7zRMO4digYFrjnQBrH32mfrlflvihQcg0TXpNvMfnqkEms5DdjtwQzvOOlY3acRBT5SjmorG6O5_2gnjunw',
});

const albums = spotifyWrapper.search.albums('Post Malone');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
