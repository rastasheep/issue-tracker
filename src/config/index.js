const envalid = require('envalid');

const dbConnection = {
  development: envalid.str({ default: 'mongodb://mongo/issue-tracker-development' }),
  test: envalid.str({ default: 'mongodb://mongo/issue-tracker-test' }),
};

const env = envalid.cleanEnv(process.env, {
  API_PORT: envalid.num({ default: 8001 }),
  API_HOST: envalid.str({ default: '0.0.0.0' }),
  DB_CONNECTION: dbConnection[process.env.NODE_ENV],
  API_PER_PAGE: envalid.num({ default: 10 }),
  FILE_STORAGE: envalid.str({ default: '/tmp/uploads/' }),
});

module.exports = env;
