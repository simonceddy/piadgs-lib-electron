/* eslint-disable no-unused-vars */
const {
  searchTitles,
  searchAuthors,
  searchSubjects,
  getFrom,
  searchLibrary,
  getAllSubjects,
} = require('./src/backend/controllers');
// const { getFrom } = require('./src/backend/controllers');
// const getAuthorTitles = require('./src/backend/helpers/getAuthorTitles');
const countModels = require('./src/backend/controllers/countModels');
const createAuthor = require('./src/backend/controllers/createAuthor');
const createSubject = require('./src/backend/controllers/createSubject');
const getAllTitles = require('./src/backend/controllers/getAllTitles');
const db = require('./src/backend/db');
const associate = require('./src/backend/helpers/associate');
const deleteModel = require('./src/backend/helpers/deleteModel');
const getTotal = require('./src/backend/helpers/getTotal');
const saveModel = require('./src/backend/helpers/saveModel');
const updateModel = require('./src/backend/helpers/updateModel');
// const getTotal = require('./src/backend/helpers/getTotal');

const event = {
  reply(...args) {
    console.log(args, args[1] ? args[1].length : null);
  }
};
// deleteModel('authors', 782);
// associate('subject', 'title', 1453, 1194)
//   .then((result) => console.log(result));

/* searchSubjects(event, {
  name: 'vic'
}); */

// searchTitles(event, {
//   title: 'test'
// });

// updateModel('authors', 782, {
//   surname: 'Medical Doctorate'
// })
//   .then((result) => console.log(result));

// createSubject(event, {
//   name: 'Zest'
// });
// getFrom('authors', { id: 66 })
//   .then((author) => getAuthorTitles(author)
//     .then((titles) => ({ ...author, titles })))
//   .then(event.reply);

// countModels('authors', (result) => console.log(result));

// getAllTitles(event);

// searchLibrary(event, {
//   author: 'edd'
// });

// db('authors')
//   .innerJoin('authors_titles', 'authors.id', 'authors_titles.author_id')
//   .innerJoin('titles', 'titles.id', 'authors_titles.title_id')
//   .where('authors.surname', 'like', 'eddy')
//   .groupBy('titles.id')
//   .select()
//   .then((result) => console.log(result));

getTotal('titles')
  .then((result) => console.log(Math.ceil(result / 10)));

getAllSubjects(event, {
  page: 12,
  itemsPerPage: 10,
  sortColumn: 'name',
  sortDirection: 'DESC'
});
