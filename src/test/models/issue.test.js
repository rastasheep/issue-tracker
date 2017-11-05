const { expect } = require('chai');

const Issue = require('../../models/issue');

describe('Model Issue', () => {
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
  });
});
