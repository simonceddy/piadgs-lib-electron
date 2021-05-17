// const db = require('../db');
const getPageOfModels = require('../helpers/getPageOfModels');
const loadTitleRelations = require('../helpers/loadTitleRelations');
const types = require('../messageTypes');

const getAllTitles = (event, { itemsPerPage = 32, page = 1 }) => {
  getPageOfModels('titles', page, itemsPerPage)
    .then((rows) => Promise.all(rows.map((title) => loadTitleRelations(title)))
      // .then((result) => result)
      .then((result) => event.reply(types.getAllTitles.reply, result))
      .catch((err) => event.reply(types.getAllTitles.reply, err)))
    .catch((err) => event.reply(types.getAllTitles.reply, err));
};

module.exports = getAllTitles;
