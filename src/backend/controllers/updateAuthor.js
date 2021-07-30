const db = require('../db');
const types = require('../messageTypes');

const respond = (event, message) => event.reply(types.updateAuthor.reply, {
  message
});

const updateAuthor = (event, params) => {
  if (!params.id) {
    return respond(event, 'No author ID given!');
  }
  return db('authors').where('id', params.id).update({
    surname: params.surname,
    given_names: params.given_names
  })
    .then((success) => {
      console.log(success);
      return respond(event, success);
    })
    .catch((err) => respond(event, err.message));
};

module.exports = updateAuthor;
