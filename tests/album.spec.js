// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });
  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });
  describe('getAlbum', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejeda
    it('should call fetch with the correct url', () => {
      getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      getAlbum('4aawyAB9vmqN3uQ7FjRGTkk');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTkk');
    });
    // verifica se o dado é recebido pela Promise
    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
  describe('getAlbums', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejeda
    it('should call fetch with the correct url', () => {
      const ids = ['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc'];
      getAlbums(ids);
      expect(stubedFetch).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums?ids=${ids}`);

      const ids2 = ['382ObEPsp2rxGrnsizN5JFX', '1A2GTWGtFfWp7KSQTwWOlo'];
      getAlbums(ids2);
      expect(stubedFetch).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums?ids=${ids2}`);
    });
    // verifica se o dado é recebido pela Promise
    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
  describe('getAlbumTracks', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejeda
    it('should call fetch with the correct url', () => {
      getAlbumTracks('382ObEPsp2rxGrnsizN5TX');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX/tracks');

      getAlbumTracks('2noRn2Aes5aoNVsU6iWThc');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2noRn2Aes5aoNVsU6iWThc/tracks');
    });
    // verifica se o dado é recebido pela Promise
    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
