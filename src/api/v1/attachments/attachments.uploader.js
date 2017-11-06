const config = require('../../../config');

const fileUploader = {
  payload: {
    output: 'file',
    parse: true,
    uploads: config.FILE_STORAGE,
  },
};

module.exports = fileUploader;
