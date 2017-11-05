const Mongoose = require('mongoose');
const Q = require('q');

const config = require('../config');

const connection = Mongoose.connect(config.DB_CONNECTION, { useMongoClient: true });
Mongoose.Promise = Q.Promise;

beforeEach(() => connection.db.dropDatabase());
