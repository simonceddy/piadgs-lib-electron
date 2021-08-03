const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');
const { titleModel } = require('../models');
const addAuthorsToTitle = require('../helpers/addAuthorsToTitle');
const addSubjectsToTitle = require('../helpers/addSubjectsToTitle');

const createTitle = async (event, params) => {
  const modelData = mergeKeyVals(Object.keys(titleModel), params);
  saveModel('titles', modelData)
    .then(async (result) => {
      if (params.authors) {
        await addAuthorsToTitle(result[0], params.authors);
        // console.log(addAuthorsResult);
      }
      if (params.subjects) {
        await addSubjectsToTitle(result[0], params.subjects);
        // console.log(addSubjectsResult);
      }
      return event.reply(types.createTitle.reply, {
        id: result[0],
        success: true
      });
    })
    .catch((err) => console.log(err));
};

module.exports = createTitle;
