const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const { c } = require('../messages/crudMessages');
const types = require('../messageTypes');
const { subjectModel } = require('../models');

const createSubject = (event, params) => {
  const modelData = mergeKeyVals(Object.keys(subjectModel), params);
  console.log(params);
  saveModel('subjects', (modelData))
    .then((id) => event.reply(types.createSubject.reply, c.success(id)))
    .catch((err) => event.reply(types.createSubject.reply, c.fail(err.message)));
};
module.exports = createSubject;
