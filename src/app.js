const Hapi = require('hapi');
const Inert = require('inert');
const Mongoose = require('mongoose');
const Q = require('q');

const config = require('./config');
const commentsV1 = require('./api/v1/comments');
const filesV1 = require('./api/v1/files');
const issuesV1 = require('./api/v1/issues');

Mongoose.Promise = Q.Promise;
Mongoose.connect(config.DB_CONNECTION, { useMongoClient: true });

const server = new Hapi.Server({
  host: config.API_HOST,
  port: config.API_PORT,
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true,
  },
});

server.route([
  ...commentsV1.routes,
  ...filesV1.routes,
  ...issuesV1.routes,
]);

(async () => {
  await server.register(Inert);
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './src/api/v1/_doc',
        redirectToSlash: true,
        index: true,
      },
    },
  });

  await server.start();
  console.log(`Server started at: ${server.info.uri}`);
})();
