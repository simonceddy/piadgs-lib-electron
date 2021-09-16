const preferences = require('./preferences');

const dbConfig = {
  client: 'sqlite3',
  connection: () => ({
    // filename: './public/database.sqlite'
    filename: preferences.databasePath
  }),
  useNullAsDefault: true,
};

module.exports = dbConfig;
