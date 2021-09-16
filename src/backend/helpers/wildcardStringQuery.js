/**
 * Add the required where clauses for wildcard searching to the given knex instance
 * @param {knex} db The Knex database instance
 * @param {string} col The column name
 * @param {*} value The value being queried
 *
 * @return {knex}
 */
function wildcardStringQuery(db, col, value) {
  return db.where(col, 'like', `${value}%`)
    .orWhere(col, 'like', `% ${value}%`);
}

module.exports = wildcardStringQuery;
