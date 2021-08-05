const deleteRelation = require('../helpers/deleteRelation');
const types = require('../messageTypes');

const removeAuthorFormTitle = (event, params = {}) => {
  deleteRelation('author', 'title', params.authorId, params.titleId)
    .then((result) => event.reply(
      types.deleteAuthorTitle.reply,
      { success: result === 1 }
    ))
    .catch(console.log);
};

module.exports = removeAuthorFormTitle;
