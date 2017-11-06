const mongoose = require('mongoose');
const { expect } = require('chai');

const Attachment = require('../../models/attachment');

describe('Attachment', () => {
  describe('attributes', () => {
    const schemaObj = Attachment.schema.obj;

    it('has required _file field with String type', (done) => {
      expect(schemaObj._file.type).to.equal(String);
      expect(schemaObj._file.required).to.equal(true);

      done();
    });

    it('has required filename field with String type', (done) => {
      expect(schemaObj.filename.type).to.equal(String);
      expect(schemaObj.filename.required).to.equal(true);

      done();
    });

    it('has timestamps enabled', (done) => {
      expect(Attachment.schema.options.timestamps).to.be.true;

      done();
    });

    it('has reference to Issue', (done) => {
      expect(schemaObj._issue.type).to.equal(mongoose.Schema.Types.ObjectId);
      expect(schemaObj._issue.ref).to.equal('Issue');

      done();
    });
  });
});
