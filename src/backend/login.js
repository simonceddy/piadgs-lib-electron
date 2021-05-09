/* eslint-disable no-unused-vars */
// testing login
const db = require('./db');

const login = ({ username, password }, event) => db.select().from('users').where({
  username
})
  .then((result) => event.reply('login-result', result))
  .catch((err) => console.log(err));

module.exports = login;
