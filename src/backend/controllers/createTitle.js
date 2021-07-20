const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');
const { titleModel } = require('../models');
const addAuthorsToTitle = require('./addAuthorsToTitle');
const addSubjectsToTitle = require('./addSubjectsToTitle');

const createTitle = (event, params) => {
  const modelData = mergeKeyVals(Object.keys(titleModel), params);
  saveModel('titles', modelData)
    .then(async (id) => {
      if (params.authors) {
        console.log(params.authors);
        const addAuthorsResult = await addAuthorsToTitle(id, params.authors);
        console.log(addAuthorsResult);
      }
      if (params.subjects) {
        console.log(params.subjects);
        const addSubjectsResult = await addSubjectsToTitle(id, params.subjects);
        console.log(addSubjectsResult);
      }
      return event.reply(types.createTitle.reply, {
        id,
        success: true
      });
    })
    .catch((err) => console.log(err));
};

module.exports = createTitle;
