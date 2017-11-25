import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;
  let promise;
  let spotifyWrapper;

  beforeEach(() => {
    spotifyWrapper = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should exist the search method', () => {
      expect(spotifyWrapper.search).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(spotifyWrapper.search.artists).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(spotifyWrapper.search.albums).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(spotifyWrapper.search.tracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(spotifyWrapper.search.playlists).to.exist;
    });
  });

  describe('Search Artists', () => {
    it('should call fetch function', () => {
      spotifyWrapper.search.artists('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      spotifyWrapper.search.artists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      spotifyWrapper.search.artists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      spotifyWrapper.search.albums('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      spotifyWrapper.search.albums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      spotifyWrapper.search.albums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      spotifyWrapper.search.tracks('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      spotifyWrapper.search.tracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      spotifyWrapper.search.tracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      spotifyWrapper.search.playlists('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      spotifyWrapper.search.playlists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      spotifyWrapper.search.playlists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});
