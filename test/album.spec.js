import chai, {
  expect,
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifoodWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album method', () => {
  let spotifood;
  let stubedFetch;

  beforeEach(() => {
    spotifood = new SpotifoodWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: '3LK21JLK321J3',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({
      json: () => ({
        album: 'name',
      }),
    });
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke Tests', () => {
    it('should have getAlbum method', () => {
      expect(spotifood.album.getAlbum).to.exist;
    });
    it('should have getAlbums method', () => {
      expect(spotifood.album.getAlbums).to.exist;
    });
    it('should have getTracks method', () => {
      expect(spotifood.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      spotifood.album.getAlbum();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      spotifood.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      spotifood.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTkk');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTkk');
    });

    it('should return the correct data from promise', () => {
      const album = spotifood.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      album.then((data) => {
        expect(data).to.be.eql({
          album: 'name',
        });
      });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      spotifood.album.getAlbums();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const ids = [
        '382ObEPsp2rxGrnsizN5TX',
        '1A2GTWGtFfWp7KSQTwWOyo',
        '2noRn2Aes5aoNVsU6iWThc',
      ];

      spotifood.album.getAlbums(ids);

      expect(stubedFetch).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums?ids=${ids}`);

      const ids2 = ['382ObEPsp2rxGrnsizN5JFX', '1A2GTWGtFfWp7KSQTwWOlo'];

      spotifood.album.getAlbums(ids2);

      expect(stubedFetch).to.have.been
        .calledWith(`https://api.spotify.com/v1/albums?ids=${ids2}`);
    });

    it('should return the correct data from promise', () => {

      const albums = spotifood.album
        .getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);

      albums.then((data) => {
        expect(data).to.be.eql({
          album: 'name',
        });
      });
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      spotifood.album.getTracks();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      spotifood.album.getTracks('382ObEPsp2rxGrnsizN5TX');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX/tracks');

      spotifood.album.getTracks('2noRn2Aes5aoNVsU6iWThc');

      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/2noRn2Aes5aoNVsU6iWThc/tracks');
    });

    it('should return the correct data from promise', () => {
      const tracks = spotifood.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');

      tracks.then((data) => {
        expect(data).to.be.eql({
          album: 'name',
        });
      });
    });
  });
});
