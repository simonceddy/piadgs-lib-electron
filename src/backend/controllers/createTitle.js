const saveModel = require('../helpers/saveModel');

const createTitle = (event, params) => saveModel('titles', params)
  .then((id) => event.reply('title-created', {
    id,
    success: true
  }))
  .catch((err) => console.log(err));

module.exports = createTitle;
