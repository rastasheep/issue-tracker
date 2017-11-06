const attachmentsCtrl = require('./attachments.controller');
const attachmentsUploader = require('./attachments.uploader');
const appConfig = require('../../../config');

const namespace = '/api/v1/attachments';
const routes = [
  {
    method: 'GET',
    path: `${namespace}/{attachmentId}`,
    handler: attachmentsCtrl.get,
  },
  {
    method: 'GET',
    path: namespace,
    handler: attachmentsCtrl.index,
  },
  {
    method: 'POST',
    path: namespace,
    handler: attachmentsCtrl.create,
    config: attachmentsUploader,
  },
  {
    method: 'GET',
    path: '/api/v1/files/{param*}',
    handler: {
      directory: {
        path: appConfig.FILE_STORAGE,
        redirectToSlash: false,
        index: false,
      },
    },
  },
];

module.exports = routes;
