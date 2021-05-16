const db = require('../db');
const loadTitleRelations = require('../helpers/loadTitleRelations');
const types = require('../messageTypes');

const getAllTitles = (event) => {
  db.from('titles').select()
    .then((rows) => Promise.all(rows.map((title) => loadTitleRelations(title)))
      .then((result) => result)
      .catch((err) => event.reply(types.getAllTitles.reply, err)))
    .then((rows) => event.reply(types.getAllTitles.reply, rows))
    .catch((err) => event.reply(types.getAllTitles.reply, err));
};

module.exports = getAllTitles;
