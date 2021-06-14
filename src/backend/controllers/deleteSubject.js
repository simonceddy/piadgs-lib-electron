const deleteModel = require('../helpers/deleteModel');
const types = require('../messageTypes');

function deleteSubject(event, params) {
  deleteModel('subjects', params.id)
    .then((result) => event.reply(types.deleteSubject.reply, {
      success: result
    }))
    .catch(console.log);
}

module.exports = deleteSubject;
