const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');
const { subjectModel } = require('../models');

const createSubject = (event, params) => {
  const modelData = mergeKeyVals(Object.keys(subjectModel), params);
  console.log(params);
  saveModel('subjects', (modelData))
    .then((id) => event.reply(types.createSubject.reply, {
      id,
      success: true
    }))
    .catch((err) => console.log(err));
};
module.exports = createSubject;
