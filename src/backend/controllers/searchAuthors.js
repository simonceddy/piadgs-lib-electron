const db = require('../db');
const contains = require('../helpers/contains');

const searchAuthors = (params, event) => {
  const { name, surname, givenNames } = params;
  const q = db.from('authors');

  if (!name && !givenNames && !surname) {
    return event.reply('authors-search-results', {
      results: [],
      success: false,
      message: 'No search parameters found'
    });
  }

  return q.where(...contains('surname', surname || name))
    .orWhere(...contains('given_names', givenNames || name))
    .select()
    .then((results) => event.reply('authors-search-results', {
      results,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = searchAuthors;
