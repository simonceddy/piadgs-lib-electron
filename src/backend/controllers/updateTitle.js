const mergeKeyVals = require('../helpers/getKeys');
const updateModel = require('../helpers/updateModel');
const types = require('../messageTypes');
const { titleModel } = require('../models');

const updateTitle = (event, params) => updateModel(
  'titles',
  params.id,
  mergeKeyVals(Object.keys(titleModel), params)
)
  .then((result) => event.reply(types.updateTitle.reply, { result }))
  .catch(console.log);

module.exports = updateTitle;
