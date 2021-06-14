const deleteModel = require('../helpers/deleteModel');
const types = require('../messageTypes');

function deleteTitle(event, params) {
  deleteModel('titles', params.id)
    .then((result) => event.reply(types.deleteTitle.reply, {
      success: result
    }))
    .catch(console.log);
}

module.exports = deleteTitle;
