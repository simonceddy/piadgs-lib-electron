const db = require('../db');

const updateModel = (table, id, data) => {
  console.log(data);
  if (!id) throw Error('No id specified!');
  return db(table)
    .where('id', id)
    .update({ ...data, updated_at: db.fn.now() })
    .then((updated) => updated)
    .catch(console.log);
};

module.exports = updateModel;
