const request = require('supertest');
const { expect } = require('chai');

const Issue = require('../../../../models/issue');
const { listener } = require('../../../../app');
const { seedAttachment } = require('./attachments.seed');

describe('#GET /api/v1/issues/:id', () => {
  let attachment;

  describe('attachment exists', () => {
    beforeEach(() => Issue.create({ status: 'pending' })
      .then(seedAttachment)
      .then((att) => {
        attachment = att;
      }));

    it('returns response with issue object and status 200', () => request(listener)
      .get(`/api/v1/attachments/${attachment._id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body._id).to.equal(attachment._id.toString());
      }));
  });

  describe('attachment does not exist', () => {
    it('returns 404 not found', () => request(listener)
      .get('/api/v1/attachments/43')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Not found');
      }));
  });
});
