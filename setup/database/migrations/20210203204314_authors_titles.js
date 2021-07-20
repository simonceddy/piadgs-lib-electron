exports.up = function (knex) {
  return knex.schema.createTable('authors_titles', (table) => {
    table.comment('Junction table for many to many author-title relationships');
    table.increments().primary();
    table.integer('author_id').unsigned().references('authors.id');
    table.integer('title_id').unsigned().references('titles.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('authors_titles');
};
