const deleteRelation = require('../helpers/deleteRelation');
const types = require('../messageTypes');

const removeAuthorFormTitle = (event, params = {}) => {
  console.log('unassociating author from title', params);
  deleteRelation('author', 'title', params.authorId, params.titleId)
    .then((result) => {
      console.log(result);
      event.reply(
        types.deleteAuthorTitle.reply,
        { success: result === 1 }
      );
    })
    .catch(console.error);
};

module.exports = removeAuthorFormTitle;
