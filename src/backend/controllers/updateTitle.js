const mergeKeyVals = require('../helpers/getKeys');
const updateModel = require('../helpers/updateModel');
const { u } = require('../messages/crudMessages');
const types = require('../messageTypes');
const { titleModel } = require('../models');

const updateTitle = (event, params) => updateModel(
  'titles',
  params.id,
  mergeKeyVals(Object.keys(titleModel), params)
)
  .then((result) => event.reply(types.updateTitle.reply, u.success(result)))
  .catch((err) => event.reply(types.updateTitle.reply, u.fail(err.message)));

module.exports = updateTitle;
