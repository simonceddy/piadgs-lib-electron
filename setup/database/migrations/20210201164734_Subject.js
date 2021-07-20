exports.up = function (knex) {
  return knex.schema.createTable('subjects', (table) => {
    table.comment('The subjects table contains data relevant to ONLY subjects');
    table.increments().primary();
    table.string('name');
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('subjects');
};
