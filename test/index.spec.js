import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import SpotifoodWrapper from '../src/index';
import { API_URL, REFRESH_TOKEN_TIME } from '../src/config';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('SpotifoodWrapper Library', () => {
  let spotifood;
  beforeEach(() => {
    spotifood = new SpotifoodWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: 'LLDKAJSPOIW3214923817A',
    });
  });

  it('should create an instance of spotifood', () => {
    expect(spotifood).to.be.an.instanceOf(SpotifoodWrapper);
  });

  it('should use the default apiURL if not provided', () => {
    expect(spotifood.apiURL).to.be.equal(API_URL);
  });

  it('should use the default refreshTokenTime if not provided', () => {
    expect(spotifood.refreshTokenTime).to.be.equal(REFRESH_TOKEN_TIME);
  });

  it('should receive clientID and clientSecret as an option', () => {
    expect(spotifood.clientID).to.be.equal('3LK21JLK321J3');
    expect(spotifood.clientSecret).to.be.equal('LLDKAJSPOIW3214923817A');
  });
});
