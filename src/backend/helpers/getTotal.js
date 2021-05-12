const db = require('../db');

const getTotal = (table) => db(table)
  .count('id')
  .then((result) => {
    if (result.length === 0) {
      return false;
    }
    return result[0]['count(`id`)'];
  });

module.exports = getTotal;
