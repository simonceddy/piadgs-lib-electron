const db = require('../db');
const deleteModel = require('../helpers/deleteModel');
const { d } = require('../messages/crudMessages');
const types = require('../messageTypes');

function deleteAuthor(event, params) {
  deleteModel('authors', params.id)
    .then((result) => {
      // console.log(result);
      if (result) {
        // delete pivot entries
        return db.table('authors_titles')
          .where('author_id', params.id)
          .delete()
          .then((success) => event.reply(types.deleteAuthor.reply, d.success(success)));
      }
      return event.reply(types.deleteAuthor.reply, d.fail('Error deleting.'));
    })
    .catch((err) => event.reply(types.deleteAuthor.reply, d.fail(err.message)));
}

module.exports = deleteAuthor;
