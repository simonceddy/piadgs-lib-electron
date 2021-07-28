const testSetupDbConfig = {
  client: 'sqlite3',
  connection: () => ({
    filename: './setup/storage/testdb.sqlite'
  }),
  useNullAsDefault: true,
};

module.exports = testSetupDbConfig;
