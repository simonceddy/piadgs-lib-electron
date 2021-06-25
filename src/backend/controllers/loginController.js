const login = require('../auth/login');

/* eslint-disable no-unused-vars */
// testing login
const loginController = ({ username, password }, event) => login({
  username, password
})
  .then((result) => event.reply('login-result', result))
  .catch(console.log);

module.exports = loginController;
