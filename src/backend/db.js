const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: () => ({
    filename: './public/database.sqlite'
  }),
  useNullAsDefault: true,
});

module.exports = db;
