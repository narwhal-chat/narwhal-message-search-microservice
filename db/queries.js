const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/narwhal_messages';
const db = pgp(connectionString);


module.exports = {
    pods: pods
};