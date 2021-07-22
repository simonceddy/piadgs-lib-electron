const contains = require('../helpers/contains');
const db = require('../db');
const types = require('../messageTypes');
const subjectSortBy = require('../helpers/subjectSortBy');

const searchSubjects = (event, {
  name,
  itemsPerPage = 32,
  page = 1,
  sortColumn = 'id',
  sortDirection = 'ASC'
}) => {
  const offset = (page * itemsPerPage) - itemsPerPage;

  return db('subjects')
    .leftOuterJoin('subjects_titles', 'subjects.id', 'subjects_titles.subject_id')
    .where(...contains('subjects.name', name))
    .modify((qb) => qb.count('subjects_titles.subject_id', { as: 'total' }))
    .columns('subjects.id', 'subjects.name', 'subjects.created_at', 'subjects.updated_at')
    .groupBy('subjects.id')
    .orderBy(subjectSortBy(sortColumn), sortDirection)
    .offset(offset)
    .limit(itemsPerPage)
    .then((results) => Promise.all(results.map(
      (subject) => db('subjects_titles')
        .where('subject_id', subject.id)
        .count()
        .then((totals) => {
          const titles = totals[0] ? totals[0]['count(*)'] : 0;
          return ({ ...subject, titles });
        })
    ))
      .then((loaded) => event.reply(types.searchSubjects.reply, {
        results: loaded,
        success: true
      })))
    .catch((err) => console.log(err));
};

module.exports = searchSubjects;
