const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');

const createSubject = (event, params) => saveModel('subjects', params)
  .then((id) => event.reply(types.createSubject.reply, {
    id,
    success: true
  }))
  .catch((err) => console.log(err));

module.exports = createSubject;
