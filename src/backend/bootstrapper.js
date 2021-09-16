const fs = require('fs');
const preferences = require('./preferences');

const hasBeenBoostrapped = (fs.existsSync(preferences.prefsDir)
&& fs.existsSync(preferences.databasePath));

class Bootstrapper {
  static isBootstrapped() {
    return hasBeenBoostrapped;
  }
}

module.exports = Bootstrapper;
