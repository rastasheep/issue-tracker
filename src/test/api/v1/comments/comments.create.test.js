const request = require('supertest');
const { expect } = require('chai');

const Issue = require('../../../../models/issue');
const { listener } = require('../../../../app');

describe('#POST /api/v1/comments', () => {
  let issue;

  beforeEach(() => Issue.create({})
    .then((createdIssue) => {
      issue = createdIssue;
    }));

  describe('text filed suplied', () => {
    it('returns response with issue object and status 201', () => request(listener)
      .post('/api/v1/comments')
      .send({ text: 'hi there', _issue: issue._id })
      .expect(201)
      .then(({ body }) => {
        expect(body.text).to.equal('hi there');
      }));
  });

  describe('text field longer than 250 characters', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/comments')
      .send({ text: new Array(260).join('x'), _issue: issue._id })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });

  describe('text field missing', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/comments')
      .send({ _issue: issue._id })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });

  describe('text field contains only whitespace characters', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/comments')
      .send({ text: '   ', _issue: issue._id })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });

  describe('timestamp set in params', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/comments')
      .send({ text: 'foo', _issue: issue._id, createdAt: '2017-05-08T00:00:00.000Z' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Invalid request payload input');
      }));
  });

  describe('issue does not exist', () => {
    it('returns error object and status 400', () => request(listener)
      .post('/api/v1/comments')
      .send({ text: 'hi there', _issue: 'bbbbb1111ccccc2222aaaaaa' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Issue not found');
      }));
  });
});
