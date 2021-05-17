const db = require('../db');

const getPageOfModels = (table, page, perPage) => {
  const offset = (page * perPage) - perPage;
  return db(table).offset(offset).limit(perPage)
    .select()
    .then((rows) => rows)
    .catch(console.log);
};

module.exports = getPageOfModels;
