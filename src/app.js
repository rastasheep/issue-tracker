const Hapi = require('hapi');

const commentsV1 = require('./api/v1/comments');
const filesV1 = require('./api/v1/files');
const issuesV1 = require('./api/v1/issues');

const server = new Hapi.Server({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8001,
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
  await server.start();
  console.log(`Server started at: ${server.info.uri}`);
})();
