const contains = require('../helpers/contains');
const db = require('../db');
const types = require('../messageTypes');

const searchSubjects = (event, params) => {
  const { name } = params;

  return db('subjects')
    // .leftOuterJoin('subjects_titles', 'subjects.id', 'subjects_titles.subject_id')
    .where(...contains('name', name))
    .select()
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
