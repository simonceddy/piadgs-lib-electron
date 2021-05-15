const saveModel = require('../helpers/saveModel');

const createSubject = (event, params) => saveModel('subjects', params)
  .then((id) => event.reply('subject-created', {
    id,
    success: true
  }))
  .catch((err) => console.log(err));

module.exports = createSubject;
