const mongoose = require('mongoose');
const { expect } = require('chai');

const Comment = require('../../models/comment');

describe('Comment', () => {
  describe('attributes', () => {
    const schemaObj = Comment.schema.obj;

    it('has text field with String type and default value', (done) => {
      expect(schemaObj.text.type).to.equal(String);
      expect(schemaObj.text.required).to.equal(true);
      expect(schemaObj.text.maxlength).to.equal(250);

      done();
    });

    it('has timestamps enabled', (done) => {
      expect(Comment.schema.options.timestamps).to.be.true;

      done();
    });

    it('has reference to Issue', (done) => {
      expect(schemaObj._issue.type).to.equal(mongoose.Schema.Types.ObjectId);
      expect(schemaObj._issue.ref).to.equal('Issue');

      done();
    });
  });
});
