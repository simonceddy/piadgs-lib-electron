const associate = require('../helpers/associate');
const types = require('../messageTypes');

const addAuthorToTile = (event, params) => {
  associate('author', 'title', params.authorId, params.titleId)
    .then((id) => event.reply(types.createAuthorTitle.reply, {
      id,
      success: true
    }))
    .catch((err) => console.log(err));
};

module.exports = addAuthorToTile;
