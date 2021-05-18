const db = require('../db');
const getSubjectTitles = require('../helpers/getSubjectTitles');
const types = require('../messageTypes');

// TODO make more efficient
const getAllSubjects = (event, {
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  const offset = (page * itemsPerPage) - itemsPerPage;
  const q = db('subjects')
    .orderBy(sortColumn, sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .groupBy('id')
    .select('id', 'name');

  return q.then((rows) => Promise.all(rows.map((subject) => getSubjectTitles(subject)
    .then((titles) => ({ ...subject, titles }))))
    .then((result) => result)
    .catch((err) => event.reply(types.getAllSubjects.reply, err)))
    .then((rows) => event.reply(types.getAllSubjects.reply, rows))
    .catch((err) => event.reply(types.getAllSubjects.reply, err));
};

module.exports = getAllSubjects;
