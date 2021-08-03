const db = require('../db');
const associate = require('./associate');
const saveModel = require('./saveModel');

const addAuthorsToTitle = (titleId, authors = []) => Promise.all(
  authors.map((author = {}) => {
    if (author.id) {
      return db('authors').where('id', author.id).first()
        .then((result) => {
          console.log(result);
          return associate('author', 'title', result.id, titleId);
        })
        .catch(console.log);
    }
    return saveModel('authors', author)
      .then((id) => associate('author', 'title', id, titleId))
      .catch(console.log);
  })
);

module.exports = addAuthorsToTitle;
