// const { session } = require('electron');
const { compare } = require('bcrypt');
const db = require('../db');
const { logUserIn } = require('./boganAuthenticate');

const failedResponse = (
  message = 'Incorrect username or password'
) => ({
  success: false,
  message
});

const login = ({ username, password }) => db.from('users')
  .where({ username })
  .first()
  .then((user) => {
    if (!user) return failedResponse();
    return compare(password, user.password)
      .then((success) => {
        if (success) {
        // Login successful
        // Authorize session
          logUserIn({ username });

          return {
            success,
            message: 'Logged in',
            user: { username: user.username, id: user.id }
          };
        }
        // Otherwise login failed
        return failedResponse();
      })
      .catch(console.log);
  })
  .catch(console.log);

module.exports = login;
