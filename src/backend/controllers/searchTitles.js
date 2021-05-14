const contains = require('../helpers/contains');
const db = require('../db');

const searchTitles = (event, params) => {
  // TODO - handle searching different columns
  const { title } = params;

  return db.from('titles').where(...contains('title', title))
    .select()
    .then((results) => event.reply('titles-search-results', {
      results,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = searchTitles;
