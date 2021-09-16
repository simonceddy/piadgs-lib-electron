const preferences = require('../../src/backend/preferences');

console.log(preferences);
const testSetupDbConfig = {
  client: 'sqlite3',
  connection: () => ({
    filename: preferences.databasePath
  }),
  useNullAsDefault: true,
};

module.exports = testSetupDbConfig;
