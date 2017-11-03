const Hapi = require('hapi');

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: process.env.PORT || 8001,
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => 'hello world',
});


(async () => {
  await server.start();
  console.log('Server started at: ' + server.info.uri);
})();
