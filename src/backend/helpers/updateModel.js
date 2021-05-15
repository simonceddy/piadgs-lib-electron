const db = require('../db');

const updateModel = (table, id, data) => {
  if (!id) throw Error('No id specified!');
  return db(table)
    .where('id', id)
    .update(data)
    .then((updated) => updated)
    .catch(console.log);
};

module.exports = updateModel;
