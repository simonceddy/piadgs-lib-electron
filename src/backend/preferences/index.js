const fs = require('fs');
const path = require('path');
const { homedir } = require('os');

const prefsDir = path.join(homedir(), '.pidags-lib');

if (!fs.existsSync(prefsDir)) {
  fs.mkdirSync(prefsDir);
}

const preferences = {
  prefsDir,
  databasePath: `${prefsDir}/db.sqlite`
};

module.exports = preferences;
