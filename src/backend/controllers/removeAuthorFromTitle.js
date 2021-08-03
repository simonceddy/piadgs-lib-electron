const deleteRelation = require('../helpers/deleteRelation');
const types = require('../messageTypes');

const removeAuthorFormTitle = (event, params = {}) => {
  deleteRelation('author', 'title', params.titleId, params.authorId)
    .then((result) => {
      console.log(result);
      return event.reply(
        types.deleteAuthorTitle.reply,
        { success: true }
      );
    })
    .catch(console.log);
};

module.exports = removeAuthorFormTitle;
