const db = require('../db');

const saveModel = (table, data) => db(table)
  .insert(data)
  .then((newIds) => newIds)
  .catch(console.log);

module.exports = saveModel;
