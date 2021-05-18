const db = require('../db');

/**
 * Create a paginated select query and return the unresolved query builder
 * @param {string} table table name
 * @param {object} options Options object
 * @returns {db} The Knex object - query is not yet resolved
 */
const getPageOfModels = (table, {
  page = 1,
  itemsPerPage = 32,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  const offset = (page * itemsPerPage) - itemsPerPage;
  return db(table).orderBy(sortColumn, sortDirection)
    .offset(offset)
    .limit(itemsPerPage);
};

module.exports = getPageOfModels;
