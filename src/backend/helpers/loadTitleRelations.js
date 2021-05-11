const getTitleAuthors = require('./getTitleAuthors');
const getTitleSubjects = require('./getTitleSubjects');

const loadTitleRelations = (title) => getTitleAuthors(title)
  .then((authors) => getTitleSubjects(title)
    .then((subjects) => ({ ...title, authors, subjects })))
  .catch(console.log);

module.exports = loadTitleRelations;
