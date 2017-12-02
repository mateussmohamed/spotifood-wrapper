import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

import { parseURL } from '../src/utils';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');
global.URL = require('url').URL;

describe('Browser', () => {
  let fetchedStub;
  let promise;
  let spotifyWrapper;

  let filters;

  beforeEach(() => {
    spotifyWrapper = new SpotifyWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: '3LK21JLK321J3',
    });

    filters = {
      locale: 'pt_BR',
      country: 'BR',
      timestamp: '2014-10-23T09:00:00',
      limit: 5,
      offset: 5,
    };

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should exist the browser method', () => {
      expect(spotifyWrapper.browser).to.exist;
    });

    it('should exist the featuredPlaylists method', () => {
      expect(spotifyWrapper.browser.featuredPlaylists).to.exist;
    });
  });

  describe('Featured Playlists', () => {
    it('should call featuredPlaylists function', () => {
      spotifyWrapper.browser.featuredPlaylists(filters);
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call featuredPlaylists when passing correct filters function', () => {
      spotifyWrapper.browser.featuredPlaylists(filters);
      const url = 'https://api.spotify.com/v1/browse/featured-playlists';
      expect(fetchedStub).to.have.been.calledWith(parseURL(url, filters));
    });
  });
});
