// eslint-disable-next-line no-unused-vars
const { Knex } = require('knex');

/**
 *
 * @param {Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable('authors', (table) => {
    table.comment('The authors table contains data relevant to ONLY authors');
    table.increments().primary();
    table.string('surname');
    table.string('given_names').nullable();
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authors');
};
