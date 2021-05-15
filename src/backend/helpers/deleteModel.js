const db = require('../db');

const deleteModel = (table, id) => db(table)
  .where('id', id)
  .delete()
  .then((success) => success)
  .catch(console.log);

module.exports = deleteModel;
