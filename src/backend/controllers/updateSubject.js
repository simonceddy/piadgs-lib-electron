const db = require('../db');
const { u } = require('../messages/crudMessages');
const types = require('../messageTypes');

const updateSubject = (event, params) => {
  const { name, id } = params;
  if (!id) {
    return event.reply(types.updateSubject.reply, u.fail('No subject ID given!'));
  }
  if (!name) {
    return event.reply(types.updateSubject.reply, u.fail('No name provided!'));
  }
  return db('subjects').where('id', id).update({
    name
  })
    .then((success) => {
      console.log(success);
      return event.reply(types.updateSubject.reply, u.success());
    })
    .catch((err) => event.reply(types.updateSubject.reply, u.fail(err.message)));
};

module.exports = updateSubject;
