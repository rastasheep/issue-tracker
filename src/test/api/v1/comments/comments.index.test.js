const request = require('supertest');
const { expect } = require('chai');
const Q = require('q');

const Issue = require('../../../../models/issue');
const { listener } = require('../../../../app');
const { seedComment } = require('./comments.seed');

describe('#GET /api/v1/comments', () => {
  let issues;

  beforeEach(() => {
    const issueParams = [...Array(24)].map(() => ({ status: 'pending' }));

    return Issue.create(issueParams)
      .then((createdIssues) => {
        issues = createdIssues;
        return Q.all(issues.map(seedComment));
      });
  });

  describe('not specifying page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated comments', () => {
      expect(respBody.length).to.equal(10);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('1');
    });
  });

  describe('specifying page limit', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .query({ limit: 20 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated comments', () => {
      expect(respBody.length).to.equal(20);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('2');
      expect(respHeaders['x-current-page']).to.equal('1');
    });
  });

  describe('specifying page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .query({ page: 3 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated comments', () => {
      expect(respBody.length).to.equal(4);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('3');
    });
  });

  describe('specifying page limit and page number', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .query({ page: 3, limit: 5 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated comments', () => {
      expect(respBody.length).to.equal(5);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('5');
      expect(respHeaders['x-current-page']).to.equal('3');
    });
  });

  describe('specifying page number that is greater than total page numbers', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .query({ page: 23 })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated comments', () => {
      expect(respBody.length).to.equal(0);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('24');
      expect(respHeaders['x-total-pages']).to.equal('3');
      expect(respHeaders['x-current-page']).to.equal('23');
    });
  });

  describe('specifying existing issue id', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .query({ _issue: issues[0]._id.toString() })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns paginated comments', () => {
      expect(respBody.length).to.equal(1);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('1');
      expect(respHeaders['x-total-pages']).to.equal('1');
      expect(respHeaders['x-current-page']).to.equal('1');
    });
  });

  describe('specifying not existing issue id', () => {
    let respBody;
    let respHeaders;

    beforeEach(() => request(listener)
      .get('/api/v1/comments')
      .query({ _issue: 'bbbbb1111ccccc2222aaaaaa' })
      .expect(200)
      .then(({ headers, body }) => {
        respBody = body;
        respHeaders = headers;
      }));

    it('returns empty collection', () => {
      expect(respBody.length).to.equal(0);
    });

    it('returns pagination headers', () => {
      expect(respHeaders['x-total-count']).to.equal('0');
      expect(respHeaders['x-total-pages']).to.equal('1');
      expect(respHeaders['x-current-page']).to.equal('1');
    });
  });
});
