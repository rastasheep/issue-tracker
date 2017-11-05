const request = require('supertest');
const { expect } = require('chai');

const { listener } = require('../../../../app');

describe('#POST /api/v1/issues', () => {
  describe('empty params', () => {
    it('returns response with issue object and status 201', () => request(listener)
      .post('/api/v1/issues')
      .send({})
      .expect(201)
      .then(({ body }) => {
        expect(body.status).to.equal('pending');
      }));
  });

  describe('valid status set in params', () => {
    it('returns response with issue object and status 201', () => request(listener)
      .post('/api/v1/issues')
      .send({ status: 'finished' })
      .expect(201)
      .then(({ body }) => {
        expect(body.status).to.equal('finished');
      }));
  });

  describe('not valid status set in params', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/issues')
      .send({ status: 'maybe' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });

  describe('timestam set in params', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/issues')
      .send({ createdAt: '2017-05-08T00:00:00.000Z' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });
});
