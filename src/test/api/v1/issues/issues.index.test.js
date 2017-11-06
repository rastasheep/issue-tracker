const request = require('supertest');
const { expect } = require('chai');

const { listener } = require('../../../../app');
const { seedIssues } = require('./issues.seed');

describe('#GET /api/v1/issues', () => {
  beforeEach(() => seedIssues({ count: 24 }));

  describe('not specifying page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/issues')
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginates issues', (done) => {
      expect(respBody.length).to.equal(10);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('1');
      done();
    });
  });

  describe('specifying page limit', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/issues')
      .query({ limit: 20 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginates issues', (done) => {
      expect(respBody.length).to.equal(20);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('2');
      expect(respHeaders['x-current-page']).to.equal('1');
      done();
    });
  });

  describe('specifying page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/issues')
      .query({ page: 3 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginates issues', (done) => {
      expect(respBody.length).to.equal(4);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('3');
      done();
    });
  });

  describe('specifying page limit and page number', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/issues')
      .query({ page: 3, limit: 5 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginates issues', (done) => {
      expect(respBody.length).to.equal(5);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('5');
      expect(respHeaders['x-current-page']).to.equal('3');
      done();
    });
  });

  describe('specifying page number that is greater than total page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/issues')
      .query({ page: 23 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginates issues', () => {
      expect(respBody.length).to.equal(0);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('23');
    });
  });
});
