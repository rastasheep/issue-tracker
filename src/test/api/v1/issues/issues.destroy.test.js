const request = require('supertest');
const { expect } = require('chai');

const { listener } = require('../../../../app');
const { seedIssues } = require('./issues.seed');

describe('#DELETE /api/v1/issues/:id', () => {
  let issue;

  describe('issue exists', () => {
    beforeEach(() => seedIssues()
      .then((issues) => {
        [issue] = issues;
      }));

    it('returns removes isseu and returns 200', () => request(listener)
      .delete(`/api/v1/issues/${issue._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.message).to.equal('Issue removed');
      })
      .then(() => request(listener)
        .get(`/api/v1/issues/${issue._id}`)
        .expect(404)));
  });

  describe('issue does not exist', () => {
    it('returns 404 not found', () => request(listener)
      .delete('/api/v1/issues/43')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Not found');
      }));
  });
});
