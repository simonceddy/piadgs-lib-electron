const db = require('../db');
const getAuthorTitles = require('../helpers/getAuthorTitles');
const types = require('../messageTypes');

// TODO make more efficient
const getAllAuthors = (event, {
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  const offset = (page * itemsPerPage) - itemsPerPage;
  const q = db('authors')
    .orderBy(sortColumn, sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .groupBy('id')
    .select('id', 'surname', 'given_names');

  return q.then((rows) => Promise.all(rows.map((author) => getAuthorTitles(author)
    .then((titles) => ({ ...author, titles }))))
    .then((result) => result)
    .catch((err) => event.reply(types.getAllAuthors.reply, err)))
    .then((rows) => event.reply(types.getAllAuthors.reply, rows))
    .catch((err) => event.reply(types.getAllAuthors.reply, err));
};

module.exports = getAllAuthors;
