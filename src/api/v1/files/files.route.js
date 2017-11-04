const filesCtrl = require('./files.controller');

const namespace = '/api/v1/files';
const routes = [
  { method: 'GET', path: `${namespace}/{fileId}`, handler: filesCtrl.get },
  { method: 'POST', path: namespace, handler: filesCtrl.create },
];

module.exports = routes;
