const request = require('supertest');
const { expect } = require('chai');

const { listener } = require('../../../../app');
const { seedIssues } = require('./issues.seed');

describe('#GET /api/v1/issues/:id', () => {
  let issue;

  describe('issue exists', () => {
    beforeEach(() => seedIssues()
      .then((issues) => {
        [issue] = issues;
      }));

    it('returns response with issue object and status 200', () => request(listener)
      .get(`/api/v1/issues/${issue._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body._id).to.equal(issue._id.toString());
      }));
  });

  describe('issue does not exist', () => {
    it('returns 404 not found', () => request(listener)
      .get('/api/v1/issues/43')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Not found');
      }));
  });
});
