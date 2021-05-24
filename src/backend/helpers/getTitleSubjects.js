const db = require('../db');

const getTitleSubjects = (params) => {
  const { id: titleId } = params;

  if (!titleId) {
    return false;
  }

  return db('subjects')
    .innerJoin('subjects_titles', 'subjects.id', 'subjects_titles.subject_id')
    .where('subjects_titles.title_id', titleId)
    .orderBy('subjects.name', 'asc')
    .select()
    .then((results) => results)
    .catch(console.log);
};

module.exports = getTitleSubjects;
