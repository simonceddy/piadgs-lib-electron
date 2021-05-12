const getTotal = require('../helpers/getTotal');

const countModels = (table, onResolve = (resolved) => resolved) => getTotal(table)
  .then((result) => onResolve(result))
  .catch(console.log);

module.exports = countModels;
