const commentsCtrl = require('./comments.controller');
const commentsValidator = require('./comments.validator');

const namespace = '/api/v1/comments';
const routes = [
  {
    method: 'GET',
    path: namespace,
    handler: commentsCtrl.index,
  },
  {
    method: 'POST',
    path: namespace,
    handler: commentsCtrl.create,
    config: commentsValidator,
  },
];

module.exports = routes;
