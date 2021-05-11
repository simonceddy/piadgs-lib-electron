const db = require('../db');

const getFrom = (table, params) => db(table).where(params).first()
  .then((result) => result)
  .catch(console.log);

module.exports = getFrom;
