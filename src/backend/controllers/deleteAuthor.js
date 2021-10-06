const deleteModel = require('../helpers/deleteModel');
const { d } = require('../messages/crudMessages');
const types = require('../messageTypes');

function deleteAuthor(event, params) {
  deleteModel('authors', params.id)
    // TODO delete entries from pivot tables
    .then((result) => event.reply(types.deleteAuthor.reply, d.success(result)))
    .catch((err) => event.reply(types.deleteAuthor.reply, d.fail(err.message)));
}

module.exports = deleteAuthor;
