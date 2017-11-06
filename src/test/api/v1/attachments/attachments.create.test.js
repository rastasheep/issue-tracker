const request = require('supertest');
const { expect } = require('chai');

const Issue = require('../../../../models/issue');
const { listener } = require('../../../../app');

describe('#POST /api/v1/attachments', () => {
  let issue;

  beforeEach(() => Issue.create({})
    .then((createdIssue) => {
      issue = createdIssue;
    }));

  describe('valid file suplied', () => {
    it('returns response with issue object and status 201', () => request(listener)
      .post('/api/v1/attachments')
      .field('_issue', issue._id.toString())
      .attach('file', 'src/test/fixtures/data.csv')
      .expect(201)
      .then(({ body }) => {
        expect(body.filename).to.equal('data.csv');
      }));
  });

  describe('large file suplied', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/attachments')
      .field('_issue', issue._id.toString())
      .attach('file', 'src/test/fixtures/big-photo.jpeg')
      .expect(413)
      .then(({ body }) => {
        expect(body.message).to.equal('Payload content length greater than maximum allowed: 1048576');
      }));
  });

  describe('_issue field missing', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/attachments')
      .attach('file', 'src/test/fixtures/data.csv')
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Issue not found');
      }));
  });

  describe('file to upload missing', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/attachments')
      .field('_issue', issue._id.toString())
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('File not provided');
      }));
  });

  describe('timestamp set in params', () => {
    it('creates attachment but ignores extra params', () => request(listener)
      .post('/api/v1/attachments')
      .field('_issue', issue._id.toString())
      .field('createdAt', '2017-05-08T00:00:00.000Z')
      .attach('file', 'src/test/fixtures/data.csv')
      .expect(201)
      .then(({ body }) => {
        expect(body.filename).to.equal('data.csv');
        expect(body.createdAt).to.not.equal('2017-05-08T00:00:00.000Z');
      }));
  });

  describe('issue does not exist', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/attachments')
      .field('_issue', 'bbbbb1111ccccc2222aaaaaa')
      .attach('file', 'src/test/fixtures/data.csv')
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Issue not found');
      }));
  });
});
