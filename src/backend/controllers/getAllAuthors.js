const db = require('../db');
const authorSortBy = require('../helpers/authorSortBy');
const getAuthorTitles = require('../helpers/getAuthorTitles');
const types = require('../messageTypes');

// TODO make more efficient
const getAllAuthors = (event, {
  filter = {},
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  console.log(itemsPerPage, page, sortColumn, sortDirection);
  const offset = (page * itemsPerPage) - itemsPerPage;
  const q = db('authors')
    .leftOuterJoin('authors_titles', 'authors.id', 'authors_titles.author_id')
    .columns(
      'authors.id',
      'authors.surname',
      'authors.given_names',
      'authors.created_at',
      'authors.updated_at'
    )
    .modify((qb) => qb.count('authors_titles.author_id', { as: 'total' }))
    .orderBy(authorSortBy(sortColumn), sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .groupBy('authors.id');

  if (filter.surname) {
    q.where('authors.surname', 'like', `%${filter.surname}%`)
      .orWhere('authors.given_names', 'like', `%${filter.surname}%`);
  }

  return q.select()
    .then((rows) => Promise.all(rows.map((author) => getAuthorTitles(author)
      .then((titles) => ({ ...author, titles }))))
      .then((result) => result)
      .catch((err) => event.reply(types.getAllAuthors.reply, err)))
    .then((rows) => event.reply(types.getAllAuthors.reply, rows))
    .catch((err) => event.reply(types.getAllAuthors.reply, err));
};

module.exports = getAllAuthors;
