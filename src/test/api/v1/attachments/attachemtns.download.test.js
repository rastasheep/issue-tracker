const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');

const Issue = require('../../../../models/issue');
const { listener } = require('../../../../app');

describe('#GET /api/v1/files/:id', () => {
  let issue;
  const { size } = fs.statSync('src/test/fixtures/data.csv');

  beforeEach(() => Issue.create({})
    .then((createdIssue) => {
      issue = createdIssue;
    }));

  describe('file exists', () => {
    it('returns rfile contents and status 200', () => request(listener)
      .post('/api/v1/attachments')
      .field('_issue', issue._id.toString())
      .attach('file', 'src/test/fixtures/data.csv')
      .expect(201)
      .then(({ body }) => request(listener)
        .get(`/api/v1/files/${body._file}`)
        .expect(200))
      .then(({ headers }) => {
        expect(headers['content-length']).to.equal(size.toString());
        expect(headers['content-type']).to.equal('application/octet-stream');
      }));
  });
});
