const db = require('../db');

const getTitleAuthors = (params) => {
  const { id: titleId } = params || false;

  if (!titleId) {
    return false;
  }

  return db('authors')
    .innerJoin('authors_titles', 'authors.id', 'authors_titles.author_id')
    .where('authors_titles.title_id', titleId)
    .orderBy('authors.name', 'asc')
    .select()
    .then((results) => results)
    .catch(console.log);
};

module.exports = getTitleAuthors;
