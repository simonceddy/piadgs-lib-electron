const db = require('../db');
const deleteModel = require('../helpers/deleteModel');
const { d } = require('../messages/crudMessages');
const types = require('../messageTypes');

function deleteSubject(event, params) {
  deleteModel('subjects', params.id)
    .then((result) => {
      // console.log(result);
      if (result) {
        // delete pivot entries
        return db.table('subjects_titles')
          .where('subject_id', params.id)
          .delete()
          .then((success) => event.reply(types.deleteSubject.reply, d.success(success)));
      }
      return event.reply(types.deleteSubject.reply, d.fail(result));
    })
    .catch((err) => event.reply(types.deleteSubject.reply, d.fail(err.message)));
}

module.exports = deleteSubject;
