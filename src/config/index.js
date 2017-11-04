const envalid = require('envalid');

const dbConnection = {
  development: envalid.str({ default: 'mongodb://mongo/florenceissue-development' }),
  test: envalid.str({ default: 'mongodb://mongo/florenceissue-test' }),
};

const env = envalid.cleanEnv(process.env, {
  API_PORT: envalid.num({ default: 8001 }),
  API_HOST: envalid.str({ default: '0.0.0.0' }),
  DB_CONNECTION: dbConnection[process.env.NODE_ENV],
});

module.exports = env;