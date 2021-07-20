const dbConfig = {
  client: 'sqlite3',
  connection: () => ({
    filename: './public/database.sqlite'
  }),
  useNullAsDefault: true,
};

module.exports = dbConfig;
