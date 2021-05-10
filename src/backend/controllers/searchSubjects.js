const contains = require('../helpers/contains');
const db = require('../db');

const searchSubjects = (event, params) => {
  const { name } = params;

  return db.from('subjects').where(...contains('name', name))
    .select()
    .then((results) => event.reply('subjects-search-results', {
      results,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = searchSubjects;
