const db = require('../db');
const loadTitleRelations = require('../helpers/loadTitleRelations');

const getAllTitles = (event) => {
  db.from('titles').select()
    .then((rows) => Promise.all(rows.map((title) => loadTitleRelations(title)))
      .then((result) => result)
      .catch((err) => event.reply('send-titles', err)))
    .then((rows) => event.reply('send-titles', rows))
    .catch((err) => event.reply('send-titles', err));
};

module.exports = getAllTitles;
