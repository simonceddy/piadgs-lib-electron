const deleteModel = require('../helpers/deleteModel');
const { d } = require('../messages/crudMessages');
const types = require('../messageTypes');

function deleteTitle(event, params) {
  deleteModel('titles', params.id)
    .then((result) => event.reply(types.deleteTitle.reply, d.success(result)))
    .catch((err) => event.reply(types.deleteTitle.reply, d.fail(err.message)));
}

module.exports = deleteTitle;
