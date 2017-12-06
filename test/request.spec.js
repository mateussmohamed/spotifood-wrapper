import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import sinonStubPromise from "sinon-stub-promise";
import SpotifoodWrapper from "../src/index";
import { unauthorized, successOrError } from "../src/request";
import { API_URL_TOKEN, REFRESH_TOKEN_TIME } from "../src/config";

chai.use(sinonChai);

sinonStubPromise(sinon);

global.fetch = require("node-fetch");

describe("Request method", () => {
  let stubedFetch;
  let promise;

  let spotifood;
  beforeEach(() => {
    spotifood = new SpotifoodWrapper({
      clientID: "3LK21JLK321J3",
      clientSecret: "LLDKAJSPOIW3214923817A",
      refreshTokenTime: REFRESH_TOKEN_TIME
    });

    stubedFetch = sinon.stub(global, "fetch");
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe("Smoke Tests", () => {
    it("shoudl have request method", () => {
      expect(spotifood.request).to.exist;
    });
  });

  it("should call fetch when request", () => {
    spotifood.request(API_URL_TOKEN);
    expect(stubedFetch).to.have.been.calledOnce;
  });

  it("should call fetch with right url passed", () => {
    spotifood.request(API_URL_TOKEN);
    expect(stubedFetch).to.have.been.calledWith(API_URL_TOKEN);
  });

  it("should call fetch with error api", () => {
    const mock = {
      json() {
        return { error: { status: 401 } };
      }
    };
    promise.resolves(mock);
    const authorization = spotifood.auth.authorization();
    expect(authorization.resolveValue).to.be.eql({ error: { status: 401 } });
  });

  describe("Utils request", () => {
    it("should return true when passed error status 401 on call unauthorized()", () => {
      const mock = { error: { status: 401 } };
      expect(unauthorized(mock)).to.be.true;
    });

    it("should return true on call successOrError()", () => {
      const mock = { error: { status: 401 } };
      expect(successOrError(unauthorized(mock))).to.be.true;
    });
  });
});
