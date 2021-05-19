const db = require('../db');
const getAuthorTitles = require('../helpers/getAuthorTitles');
const types = require('../messageTypes');

const sortBy = (col) => {
  switch (col) {
    case 'titles':
      return 'total';
    default:
      return `authors.${col}`;
  }
};

// TODO make more efficient
const getAllAuthors = (event, {
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  console.log(itemsPerPage, page, sortColumn, sortDirection);
  const offset = (page * itemsPerPage) - itemsPerPage;
  const q = db('authors')
    .leftOuterJoin('authors_titles', 'authors.id', 'authors_titles.author_id')
    .columns('authors.id', 'authors.surname', 'authors.given_names')
    .modify((qb) => qb.count('authors_titles.author_id', { as: 'total' }))
    .orderBy(sortBy(sortColumn), sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .groupBy('authors.id');

  return q.then((rows) => Promise.all(rows.map((author) => getAuthorTitles(author)
    .then((titles) => ({ ...author, titles }))))
    .then((result) => result)
    .catch((err) => event.reply(types.getAllAuthors.reply, err)))
    .then((rows) => event.reply(types.getAllAuthors.reply, rows))
    .catch((err) => event.reply(types.getAllAuthors.reply, err));
};

module.exports = getAllAuthors;
