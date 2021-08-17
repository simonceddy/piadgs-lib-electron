const { knex } = require('knex');
const dbConfig = require('./testSetupDbConfig');

/**
 * @var {knex}
 */
const testDb = knex(dbConfig);

module.exports = testDb;
