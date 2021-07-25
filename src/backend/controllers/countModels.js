const getTotal = require('../helpers/getTotal');

const countModels = (
  table,
  onResolve = (resolved) => resolved,
  filter = {}
) => getTotal(table, filter)
  .then((result) => onResolve(result))
  .catch(console.log);

module.exports = countModels;
