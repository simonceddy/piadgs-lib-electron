const deleteModel = require('../helpers/deleteModel');
const types = require('../messageTypes');

function deleteAuthor(event, params) {
  deleteModel('authors', params.id)
    .then((result) => event.reply(types.deleteAuthor.reply, {
      success: result
    }))
    .catch(console.log);
}

module.exports = deleteAuthor;
