const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');
const { titleModel } = require('../models');

const createTitle = (event, params) => {
  const modelData = mergeKeyVals(Object.keys(titleModel), params);
  saveModel('titles', modelData)
    .then(async (id) => {
      if (params.authors) {
        console.log(params.authors);
        // assign authors to title
        // if author has no id create new
        // and assign to title
      }
      if (params.subjects) {
        console.log(params.subjects);
        // assign authors to title
        // if author has no id create new
        // and assign to title
      }
      return event.reply(types.createTitle.reply, {
        id,
        success: true
      });
    })
    .catch((err) => console.log(err));
};

module.exports = createTitle;
