const db = require('../db');

const getTotal = (table, filter = {}) => db(table)
  .count('id')
  .modify((q) => Object.keys(filter).map((key) => q.where(key, 'like', `${filter[key]}`)))
  .then((result) => {
    if (result.length === 0) {
      return false;
    }
    return result[0]['count(`id`)'];
  });

module.exports = getTotal;
