const db = require('../db');
const types = require('../messageTypes');

const respond = (event, message) => event.reply(types.updateSubject.reply, {
  message
});

const updateSubject = (event, params) => {
  const { name, id } = params;
  if (!id) {
    return respond(event, 'No subject ID given!');
  }
  if (!name) {
    return respond(event, 'No name provided!');
  }
  return db('subjects').where('id', id).update({
    name
  })
    .then((success) => {
      console.log(success);
      return respond(event, success);
    })
    .catch((err) => respond(event, err.message));
};

module.exports = updateSubject;
