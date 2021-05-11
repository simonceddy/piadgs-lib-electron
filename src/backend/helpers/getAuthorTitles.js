const db = require('../db');
const getTitleSubjects = require('./getTitleSubjects');

const getAuthorTitles = (params) => {
  const { id: authorId } = params;

  if (!authorId) {
    return false;
  }

  return db('titles')
    .innerJoin('authors_titles', 'titles.id', 'authors_titles.title_id')
    .where('authors_titles.author_id', authorId)
    .select()
    .then((results) => Promise.all(
      results.map((title) => getTitleSubjects(title)
        .then((subjects) => ({
          ...title,
          subjects
        }))
        .catch(console.log))
    ))
    .catch(console.log);
};

module.exports = getAuthorTitles;
