const db = require('../db');

const getAll = (event, table, messageType) => {
  db.from(table).select()
    .then((rows) => event.reply(messageType, rows))
    .catch((err) => event.reply(messageType, err.message));
};

module.exports = getAll;
