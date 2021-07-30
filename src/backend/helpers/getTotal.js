const db = require('../db');

const getTotal = (table, filter = {}) => db(table)
  .count('id')
  .modify((q) => {
    const keys = Object.keys(filter);
    if (keys.length > 0 && filter[keys[0]]) {
      const firstKey = keys.shift();
      q.where(firstKey, 'like', `%${filter[firstKey]}%`);

      if (keys.length > 0) {
        Object.keys(filter)
          .map((key) => q.orWhere(key, 'like', `%${filter[key]}%`));
      }
    }
  })
  .then((result) => {
    if (result.length === 0) {
      return false;
    }
    return result[0]['count(`id`)'];
  });

module.exports = getTotal;
