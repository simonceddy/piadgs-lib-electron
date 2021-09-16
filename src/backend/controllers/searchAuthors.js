const db = require('../db');
const authorSortBy = require('../helpers/authorSortBy');
const wildcardStringQuery = require('../helpers/wildcardStringQuery');
const types = require('../messageTypes');

const searchAuthors = (event, {
  name,
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  console.log(sortColumn, sortDirection);
  const q = db.from('authors');
  const offset = (page * itemsPerPage) - itemsPerPage;

  if (!name) {
    return event.reply(types.searchAuthors.reply, {
      results: [],
      success: false,
      message: 'No search parameters found'
    });
  }

  return wildcardStringQuery(q, 'authors.name', name)
    .leftOuterJoin('authors_titles', 'authors.id', 'authors_titles.author_id')
    .columns('authors.id', 'authors.name')
    .modify((qb) => qb.countDistinct('authors_titles.title_id', { as: 'total' }))
    .orderBy(authorSortBy(sortColumn), sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .groupBy('authors.id')
    .then((results) => event.reply(types.searchAuthors.reply, {
      results,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = searchAuthors;
