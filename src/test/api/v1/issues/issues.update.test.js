const request = require('supertest');
const { expect } = require('chai');

const { listener } = require('../../../../app');
const { seedIssues } = require('./issues.seed');

describe('#PUT /api/v1/issues/:id', () => {
  let issue;

  describe('issue exists', () => {
    beforeEach(() => seedIssues()
      .then((issues) => {
        [issue] = issues;
      }));

    it('updates issue status', () => request(listener)
      .put(`/api/v1/issues/${issue._id}`)
      .send({ status: 'finished' })
      .expect(200)
      .then(({ body }) => {
        expect(body.status).to.equal('finished');
      }));

    it('doesn\'t allow invalid value for issue status', () => request(listener)
      .put(`/api/v1/issues/${issue._id}`)
      .send({ status: 'maybe' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));

    it('doesn\'t allow updating of timestamps', () => request(listener)
      .put(`/api/v1/issues/${issue._id}`)
      .send({ createdAt: '2017-05-08T00:00:00.000Z' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });

  describe('issue does not exist', () => {
    it('returns 404 not found', () => request(listener)
      .put('/api/v1/issues/43')
      .send({ status: 'finished' })
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Not found');
      }));
  });
});
