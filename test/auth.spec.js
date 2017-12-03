import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifoodWrapper from '../src/index';
import { REFRESH_TOKEN_TIME } from '../src/config';

chai.use(sinonChai);

sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Auth method', () => {
  let stubedFetch;
  let promise;
  const spotifood = new SpotifoodWrapper({
    clientID: '3LK21JLK321J3',
    clientSecret: 'LLDKAJSPOIW3214923817A',
    refreshTokenTime: REFRESH_TOKEN_TIME,
  });
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke Tests', () => {
    it('shoudl have auth method', () => {
      expect(spotifood.auth).to.exist;
    });


    it('shoudl have auth.authorization method', () => {
      expect(spotifood.auth.authorization).to.exist;
    });
  });

  describe('Authorization method Tests', () => {
    it('should call auth.authorization when request', () => {
      spotifood.auth.authorization();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should return the correct data from promise', () => {
      const mock = {
        json() {
          return { access_token: '4aawyAB9vmqN3uQ7FjRGTy' };
        },
      };
      promise.resolves(mock);
      const authorization = spotifood.auth.authorization();
      expect(authorization.resolveValue).to.be.eql({ access_token: '4aawyAB9vmqN3uQ7FjRGTy' });
    });
  });
});
