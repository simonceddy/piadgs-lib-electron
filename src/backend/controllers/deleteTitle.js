const db = require('../db');
const deleteModel = require('../helpers/deleteModel');
const { d } = require('../messages/crudMessages');
const types = require('../messageTypes');

function deleteTitle(event, params) {
  deleteModel('titles', params.id)
    .then(async (result) => {
      console.log(result);
      const res = {
        titleDeleted: Boolean(result),
        authorPivotsDeleted: null,
        subjectPivotsDeleted: null,
      };
      if (result) {
        // delete pivot entries
        return Promise.all([
          () => {
            db.table('authors_titles')
              .where('title_id', params.id)
              .delete()
              .then((success) => {
                res.authorPivotsDeleted = Boolean(success);
              })
              .catch(console.error);
          },
          () => {
            db.table('subjects_titles')
              .where('title_id', params.id)
              .delete()
              .then((success) => {
                res.subjectPivotsDeleted = Boolean(success);
              })
              .catch(console.error);
          }
        ])
          .then(() => event.reply(types.deleteTitle.reply, d.success(res)));
      }
      return event.reply(types.deleteTitle.reply, d.fail(res));
    })
    .catch((err) => event.reply(types.deleteTitle.reply, d.fail(err.message)));
}

module.exports = deleteTitle;
