const { isLoggedIn } = require('../auth/boganAuthenticate');

const authorize = (event, params, next = () => {}) => {
  if (isLoggedIn()) return next(event, params);
  return event.reply('unauthorized', {
    message: 'Unauthorized action'
  });
};

module.exports = authorize;
