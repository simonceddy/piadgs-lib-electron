const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const types = require('../messageTypes');
const { authorModel } = require('../models');

const createAuthor = (event, params) => saveModel('authors', mergeKeyVals(Object.keys(authorModel), params))
  .then((id) => event.reply(types.createAuthor.reply, {
    id,
    success: true
  }))
  .catch((err) => console.log(err));

module.exports = createAuthor;
