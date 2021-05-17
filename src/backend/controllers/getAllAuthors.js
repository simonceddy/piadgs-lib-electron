const db = require('../db');
const getAuthorTitles = require('../helpers/getAuthorTitles');
const types = require('../messageTypes');

// TODO make more efficient
const getAllAuthors = (event) => {
  db.from('authors').select()
    .then((rows) => Promise.all(rows.map((author) => getAuthorTitles(author)
      .then((titles) => ({ ...author, titles }))))
      .then((result) => result)
      .catch((err) => event.reply(types.getAllAuthors.reply, err)))
    .then((rows) => event.reply(types.getAllAuthors.reply, rows))
    .catch((err) => event.reply(types.getAllAuthors.reply, err));
};

module.exports = getAllAuthors;
