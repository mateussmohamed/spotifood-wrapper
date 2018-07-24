import chai, {
  expect,
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifoodWrapper from '../src/index';
import {
  unauthorized,
  successOrError,
} from '../src/request';
import {
  API_URL_TOKEN,
  REFRESH_TOKEN_TIME,
} from '../src/config';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Request method', () => {
  let stubedFetch;

  let spotifood;
  beforeEach(() => {
    spotifood = new SpotifoodWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: 'LLDKAJSPOIW3214923817A',
      refreshTokenTime: REFRESH_TOKEN_TIME,
    });

    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({
      json() {
        return {
          error: {
            status: 401,
          },
        };
      },
    });
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke Tests', () => {
    it('shoudl have request method', () => {
      expect(spotifood.request).to.exist;
    });
  });

  it('should call fetch when request', () => {
    spotifood.request(API_URL_TOKEN);

    expect(stubedFetch).to.have.been.calledOnce;
  });

  it('should call fetch with right url passed', () => {
    spotifood.request(API_URL_TOKEN);

    expect(stubedFetch).to.have.been.calledWith(API_URL_TOKEN);
  });

  it('should call fetch with error api', () => {
    const authorization = spotifood.auth.authorization();

    authorization.then((data) => {
      expect(data).to.be.eql({
        error: {
          status: 401,
        },
      });
    });
  });

  describe('Utils request', () => {
    it('should return true when passed error status 401 on call unauthorized()', () => {
      const mock = {
        error: {
          status: 401,
        },
      };

      expect(unauthorized(mock)).to.be.true;
    });

    it('should return true on call successOrError()', () => {
      const mock = {
        error: {
          status: 401,
        },
      };
      expect(successOrError(unauthorized(mock))).to.be.true;
    });
  });
});
