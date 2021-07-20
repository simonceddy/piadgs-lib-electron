const { Knex } = require('knex');

/**
 *
 * @param {Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable('titles', (table) => {
    table.comment('The titles table - contains data relevant to ONLY the title. Subjects, authors, etc have their own tables');
    table.increments().primary();
    table.string('title');
    // table.string('authors');
    // table.string('subjects');
    table.string('imprint');
    table.string('isbn');
    table.string('accession_number');
    table.string('source');
    table.string('date');
    table.string('call_number'); // TODO rename as location
    // table.string('location');
    table.string('cost');
    table.string('pagination');
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('titles');
};
