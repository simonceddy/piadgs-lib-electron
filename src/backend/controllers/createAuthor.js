const mergeKeyVals = require('../helpers/getKeys');
const saveModel = require('../helpers/saveModel');
const { c } = require('../messages/crudMessages');
const types = require('../messageTypes');
const { authorModel } = require('../models');

const createAuthor = (event, params) => {
  saveModel('authors', mergeKeyVals(Object.keys(authorModel), params))
    .then((id) => event.reply(types.createAuthor.reply, c.success(id)))
    .catch((err) => event.reply(types.createAuthor.reply, c.fail(err.message)));
};

module.exports = createAuthor;
