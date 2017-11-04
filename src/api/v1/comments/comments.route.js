const commentsCtrl = require('./comments.controller');

const namespace = '/api/v1/comments';
const routes = [
  { method: 'GET', path: namespace, handler: commentsCtrl.index },
  { method: 'POST', path: namespace, handler: commentsCtrl.create },
];

module.exports = routes;
