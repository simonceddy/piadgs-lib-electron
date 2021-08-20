const logout = require('../auth/logout');

const logoutController = (event) => logout()
  .then((result) => event.reply('logout-result', result))
  .catch(console.log);

module.exports = logoutController;
