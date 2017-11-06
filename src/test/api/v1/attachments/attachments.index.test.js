const request = require('supertest');
const { expect } = require('chai');
const Q = require('q');

const Issue = require('../../../../models/issue');
const { listener } = require('../../../../app');
const { seedAttachment } = require('./attachments.seed');

describe('#GET /api/v1/attachments', () => {
  let issues;

  beforeEach(() => {
    const issueParams = [...Array(24)].map(() => ({ status: 'pending' }));

    return Issue.create(issueParams)
      .then((createdIssues) => {
        issues = createdIssues;
        return Q.all(issues.map(seedAttachment));
      });
  });

  describe('not specifying page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/attachments')
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated attachments', (done) => {
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
      .get('/api/v1/attachments')
      .query({ limit: 20 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated attachments', (done) => {
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
      .get('/api/v1/attachments')
      .query({ page: 3 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated attachments', (done) => {
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
      .get('/api/v1/attachments')
      .query({ page: 3, limit: 5 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated attachments', (done) => {
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
      .get('/api/v1/attachments')
      .query({ page: 23 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated attachments', (done) => {
      expect(respBody.length).to.equal(0);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('23');
      done();
    });
  });

  describe('specifying existing issue id', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/attachments')
      .query({ _issue: issues[0]._id.toString() })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated attachments', (done) => {
      expect(respBody.length).to.equal(1);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('1');
      expect(respHeaders['x-total-pages']).to.equal('1');
      expect(respHeaders['x-current-page']).to.equal('1');
      done();
    });
  });

  describe('specifying not existing issue id', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/attachments')
      .query({ _issue: 'bbbbb1111ccccc2222aaaaaa' })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns empty collection', (done) => {
      expect(respBody.length).to.equal(0);
      done();
    });

    it('returns pagination headers', (done) => {
      expect(respHeaders['x-total-count']).to.equal('0');
      expect(respHeaders['x-total-pages']).to.equal('1');
      expect(respHeaders['x-current-page']).to.equal('1');
      done();
    });
  });
});
