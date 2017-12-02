import SpotifoodWrapper from '../src/index';

global.fetch = require('node-fetch');

const SpotifoodWrapper = new SpotifoodWrapper({
  clientID: '24db18fe385c4ddfb9eb77bd70816b21',
  clientSecret: '49013f8eddb942499b71c3257d6e177b',
});

// SpotifoodWrapper.auth.authorization()
  // .then(data => console.log(data));

console.log(SpotifoodWrapper);

// const albums = SpotifoodWrapper.search.albums('Post Malone');

// albums.then(data => data.albums.items.map(item => console.log(item.name)));
