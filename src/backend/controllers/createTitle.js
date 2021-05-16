const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');

const createTitle = (event, params) => saveModel('titles', params)
  .then((id) => event.reply(types.createTitle.reply, {
    id,
    success: true
  }))
  .catch((err) => console.log(err));

module.exports = createTitle;
