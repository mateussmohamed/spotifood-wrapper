# Spotifood Wrapper [WIP :construction:]

[![Build Status](https://travis-ci.org/mateussmohamed/spotifood-wrapper.svg?branch=master)](https://travis-ci.org/mateussmohamed/spotifood-wrapper) [![Coverage Status](https://coveralls.io/repos/github/mateussmohamed/spotifood-wrapper/badge.svg?branch=master)](https://coveralls.io/github/mateussmohamed/spotifood-wrapper?branch=master)

A wrapper for consume the [Spotify Web API](https://developer.spotifood.com/web-api/).

## :warning: Disclaimer :warning:

The authentication method should be refactored. The api used in the authorization is only for server-side request, and ajax requests do not work

For correct operation, I recommend using CORS Domain extensions.

[CORS Everywhere](https://addons.mozilla.org/en/firefox/addon/cors-everywhere/) for Firefox

[Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US/) for Chrome


## Browser Support

This library relies on [Fetch API](https://fetch.spec.whatwg.org/). And this API is supported in the following browsers.

![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) |
--- | --- | --- | --- | --- |
39+ ✔ | 42+ ✔ | 29+ ✔ | 10.1+ ✔ | Nope ✘ |

## Dependencies
* [js-cookie](https://github.com/js-cookie/js-cookie) A simple, lightweight JavaScript API for handling browser cookies 

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests to the Spotify Web API. For environments that don't support fetch, you'll need to provide a [polyfill](https://github.com/github/fetch) to browser or [polyfill](https://github.com/bitinn/node-fetch) to Node.

## Installation

```sh
$ npm install spotifood-wrapper --save
```
or
```sh
$ yarn add spotifood-wrapper
```

## How to use

### ES6

```js
// to import a specific method
import Spotifood from 'spotifood-wrapper';

const spotify = new Spotifood({
  clientID: 'YOUR_CLIENT_ID_HERE',
  clientSecret: 'YOUR_CLIENT_SECRET_HERE'
});

// using  method
spotifood.search.artists('Incubus');
```

### CommonJS

```js
const Spotifood = require('spotifood-wrapper');

const spotify = new Spotifood({
  clientID: 'YOUR_CLIENT_ID_HERE',
  clientSecret: 'YOUR_CLIENT_SECRET_HERE'
});
```

### UMD in Browser

```html
<!-- to import non-minified version -->
<script src="spotifood-wrapper.umd.js"></script>

<!-- to import minified version -->
<script src="spotifood-wrapper.umd.min.js"></script>
```

After that the library will be available to the Global as `Spotifood`. Follow an example:

```js

const spotify = new Spotifood({
  clientID: 'YOUR_CLIENT_ID_HERE',
  clientSecret: 'YOUR_CLIENT_SECRET_HERE'
});

const albums = spotifood.search.albums('Choosen Artist');
```

## Methods

> Follow the methods that the library provides.

### browse.featuredPlaylists(params)

> Search for informations about Albums with provided query. Test in [Spotify Web Console](https://developer.spotifood.com/web-api/console/get-search-item/) with type defined as *album*.

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`filters`   |*Object* | An object filters|
|`locale`   |*String* | A locale code|
|`country`   |*String* | A country code|
|`timestamp`   |*String* | A timestamp |
|`offset`   |*String* | Limit of items |

* All params is optionals

**Example**


```js
const filters = { 
  locale: 'pt_BR',
  country: 'BR',
  timestamp: '',
  offset: 2
};

spotifood.browse.featuredPlaylists(filters)
  .then(data => {
    // do what you want with the data
  })
```

### search.albums(query)


**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|


**Example**

```js
spotifood.search.albums('Incubus')
  .then(data => {
    // do what you want with the data
  })
```

### search.artists(query)


**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|


**Example**

```js
spotifood.search.artists('Incubus')
  .then(data => {
    // do what you want with the data
  })
```

### search.tracks(query)



**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|


**Example**

```js
spotifood.search.tracks('Drive')
  .then(data => {
    // do what you want with the data
  })
```

### search.playlists(query)

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|


**Example**

```js
spotifood.search.playlists('Happy Day')
  .then(data => {
    // do what you want with the data
  })
```

### album.getAlbum(id)

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`id`   |*string* | 'Specific id'|


**Example**

```js
spotifood.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
  .then(data => {
    // do what you want with the data
  })
```

### album.getAlbums(ids)

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`ids`   |*Array of strings* | ['id1', 'id2']|

**Example**

```js
spotifood.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '1A2GTWGtFfWp7KSQTwWOyo'])
  .then(data => {
    // do what you want with the data
  })
```

### album.getTracks(id)

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`id`   |*string* | 'Specific id'|

**Example**

```js
spotifood.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy')
  .then(data => {
    // do what you want with the data
  })
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Author

| ![Mateus Santana](https://avatars0.githubusercontent.com/u/12900896?s=140&v=4)|
|:---------------------:|
|  [Mateus Santana](https://github.com/mateussmohamed)   |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
