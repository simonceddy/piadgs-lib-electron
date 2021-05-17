const db = require('../db');
const getSubjectTitles = require('../helpers/getSubjectTitles');
const types = require('../messageTypes');

// TODO make more efficient
const getAllSubjects = (event) => {
  db.from('subjects').select()
    .then((rows) => Promise.all(rows.map((subject) => getSubjectTitles(subject)
      .then((titles) => ({ ...subject, titles }))))
      .then((result) => result)
      .catch((err) => event.reply(types.getAllSubjects.reply, err)))
    .then((rows) => event.reply(types.getAllSubjects.reply, rows))
    .catch((err) => event.reply(types.getAllSubjects.reply, err));
};

module.exports = getAllSubjects;
