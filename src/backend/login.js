/* eslint-disable no-unused-vars */
// testing login
const { compare } = require('bcrypt');
const db = require('./db');

const getResponse = ({ username }, success) => ({ success, user: { username } });

const login = ({ username, password }, event) => db.from('users')
  .where({ username })
  .first()
  .then((user) => compare(password, user.password)
    .then((result) => event.reply('login-result', getResponse(user, result)))
    .catch((err) => console.log(err)))
  .catch((err) => console.log(err));

module.exports = login;
