const db = require('../db');
const getTitleAuthors = require('./getTitleAuthors');

const getSubjectTitles = (params) => {
  const { id: subjectId } = params;

  if (!subjectId) {
    return false;
  }

  return db('titles')
    .innerJoin('subjects_titles', 'titles.id', 'subjects_titles.title_id')
    .where('subjects_titles.subject_id', subjectId)
    .select()
    .then((results) => Promise.all(
      results.map((title) => getTitleAuthors(title)
        .then((authors) => ({
          ...title,
          authors
        }))
        .catch(console.log))
    ))
    .catch(console.log);
};

module.exports = getSubjectTitles;
