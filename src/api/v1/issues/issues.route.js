const issuesCtrl = require('./issues.controller');
const issuesValidator = require('./issues.validator');

const namespace = '/api/v1/issues';
const routes = [
  {
    method: 'GET',
    path: namespace,
    handler: issuesCtrl.index,
  },
  {
    method: 'GET',
    path: `${namespace}/{issueId}`,
    handler: issuesCtrl.get,
  },
  {
    method: 'POST',
    path: namespace,
    handler: issuesCtrl.create,
    config: issuesValidator,
  },
  {
    method: 'PUT',
    path: `${namespace}/{issueId}`,
    handler: issuesCtrl.update,
    config: issuesValidator,
  },
  {
    method: 'DELETE',
    path: `${namespace}/{issueId}`,
    handler: issuesCtrl.destroy,
  },
];

module.exports = routes;
