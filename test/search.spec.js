import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifoodWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search method', () => {
  let fetchedStub;
  let promise;
  let wrapper;

  beforeEach(() => {
    wrapper = new SpotifoodWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: '3LK21JLK321J3',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should exist the search method', () => {
      expect(wrapper.search).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(wrapper.search.artists).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(wrapper.search.albums).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(wrapper.search.tracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(wrapper.search.playlists).to.exist;
    });
  });

  describe('Search Artists', () => {
    it('should call fetch function', () => {
      wrapper.search.artists('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      wrapper.search.artists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      wrapper.search.artists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      wrapper.search.albums('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      wrapper.search.albums('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      wrapper.search.albums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      wrapper.search.tracks('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      wrapper.search.tracks('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      wrapper.search.tracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      wrapper.search.playlists('Russ');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      wrapper.search.playlists('Incubus');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      wrapper.search.playlists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});
