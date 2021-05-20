const db = require('../db');
const authorSortBy = require('../helpers/authorSortBy');
const contains = require('../helpers/contains');
const types = require('../messageTypes');

const searchAuthors = (event, {
  name,
  surname,
  givenNames,
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  console.log(sortColumn, sortDirection);
  const q = db.from('authors');
  const offset = (page * itemsPerPage) - itemsPerPage;

  if (!name && !givenNames && !surname) {
    return event.reply(types.searchAuthors.reply, {
      results: [],
      success: false,
      message: 'No search parameters found'
    });
  }

  return q.where(...contains('surname', surname || name))
    .orWhere(...contains('given_names', givenNames || name))
    .leftOuterJoin('authors_titles', 'authors.id', 'authors_titles.author_id')
    .columns('authors.id', 'authors.surname', 'authors.given_names')
    .modify((qb) => qb.count('authors_titles.author_id', { as: 'total' }))
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
