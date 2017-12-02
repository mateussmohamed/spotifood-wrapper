import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifoodWrapper from '../src/index';
import { API_URL, REFRESH_TOKEN_TIME } from '../src/config';

chai.use(sinonChai);

sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('wrapper Library', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = new SpotifoodWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: 'LLDKAJSPOIW3214923817A',
      refreshTokenTime: REFRESH_TOKEN_TIME,
    });
  });

  it('should create an instance of wrapper', () => {
    expect(wrapper).to.be.an.instanceOf(SpotifoodWrapper);
  });

  it('should use the default apiURL if not provided', () => {
    expect(wrapper.apiURL).to.be.equal(API_URL);
  });

  it('should use the default refreshTokenTime if not provided', () => {
    expect(wrapper.refreshTokenTime).to.be.equal(REFRESH_TOKEN_TIME);
  });

  it('should receive clientID and clientSecret as an option', () => {
    expect(wrapper.clientID).to.be.equal('3LK21JLK321J3');
    expect(wrapper.clientSecret).to.be.equal('LLDKAJSPOIW3214923817A');
  });

  describe('Request method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returnsPromise();
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('shoudl have request method', () => {
      expect(wrapper.request).to.exist;
    });

    it('should call fetch when request', () => {
      wrapper.request('https://whatever.com');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with right url passed', () => {
      wrapper.request('https://whatever.com');
      expect(stubedFetch).to.have.been.calledWith('https://whatever.com');
    });

    it('should call fetch with error api', () => {
      const mock = {
        json() {
          return { error: { status: 401 } };
        },
      };
      promise.resolves(mock);
      const authorization = wrapper.auth.authorization();
      expect(authorization.resolveValue).to.be.eql({ error: { status: 401 } });
    });
  });
});
