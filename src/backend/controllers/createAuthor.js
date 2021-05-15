const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const { authorModel } = require('../models');

const createAuthor = (event, params) => saveModel('authors', mergeKeyVals(Object.keys(authorModel), params))
  .then((id) => event.reply('author-created', {
    id,
    success: true
  }))
  .catch((err) => console.log(err));

module.exports = createAuthor;
