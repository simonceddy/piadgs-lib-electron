const { knex } = require('knex');
const dbConfig = require('./dbConfig');

/**
 * @var {knex}
 */
const db = knex(dbConfig);

module.exports = db;
