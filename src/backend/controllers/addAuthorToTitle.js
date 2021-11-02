const associate = require('../helpers/associate');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');

const associateWithIds = (event, authorId, titleId) => associate('author', 'title', authorId, titleId)
  .then((id) => event.reply(types.createAuthorTitle.reply, {
    id,
    success: true,
    authorId,
    titleId
  }))
  .catch((err) => console.log(err));

const addAuthorToTile = async (event, params) => {
  if (!params.authorId && params.name) {
    return saveModel('authors', {
      name: params.name
    }).then((ids) => {
      console.log('IDS', ids);
      const [authorId] = ids;
      return associateWithIds(event, authorId, params.titleId);
    });
  }

  return associateWithIds(event, params.authorId, params.titleId);
};

module.exports = addAuthorToTile;
