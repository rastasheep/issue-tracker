const mongoose = require('mongoose');
const { expect } = require('chai');

const Issue = require('../../models/issue');

describe('Issue', () => {
  describe('attributes', () => {
    const schemaObj = Issue.schema.obj;

    it('has status with String type and default value', (done) => {
      expect(schemaObj.status.type).to.equal(String);
      expect(schemaObj.status.default).to.equal('pending');

      done();
    });

    it('has timestamps enabled', (done) => {
      expect(Issue.schema.options.timestamps).to.be.true;

      done();
    });

    it('has maby comments', (done) => {
      expect(schemaObj.comments[0].type).to.equal(mongoose.Schema.Types.ObjectId);
      expect(schemaObj.comments[0].ref).to.equal('Comment');

      done();
    });
  });
});
