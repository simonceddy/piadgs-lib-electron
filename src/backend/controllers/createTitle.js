const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');
const { titleModel } = require('../models');

const createTitle = (event, params) => {
  const modelData = mergeKeyVals(Object.keys(titleModel), params);
  saveModel('titles', modelData)
    .then((id) => event.reply(types.createTitle.reply, {
      id,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = createTitle;
