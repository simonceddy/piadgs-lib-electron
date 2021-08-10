const deleteModel = require('../helpers/deleteModel');
const { d } = require('../messages/crudMessages');
const types = require('../messageTypes');

function deleteSubject(event, params) {
  deleteModel('subjects', params.id)
    .then((result) => event.reply(types.deleteSubject.reply, d.success(result)))
    .catch((err) => event.reply(types.deleteSubject.reply, d.fail(err.message)));
}

module.exports = deleteSubject;
