/* eslint-disable no-unused-vars */
const {
  searchTitles, searchAuthors, searchSubjects, getFrom
} = require('./src/backend/controllers');
// const { getFrom } = require('./src/backend/controllers');
// const getAuthorTitles = require('./src/backend/helpers/getAuthorTitles');
const countModels = require('./src/backend/controllers/countModels');
const createAuthor = require('./src/backend/controllers/createAuthor');
const createSubject = require('./src/backend/controllers/createSubject');
const getAllTitles = require('./src/backend/controllers/getAllTitles');
const associate = require('./src/backend/helpers/associate');
const deleteModel = require('./src/backend/helpers/deleteModel');
const saveModel = require('./src/backend/helpers/saveModel');
const updateModel = require('./src/backend/helpers/updateModel');
// const getTotal = require('./src/backend/helpers/getTotal');

const event = {
  reply(...args) {
    console.log(...args);
  }
};
// deleteModel('authors', 782);
// associate('subject', 'title', 1453, 1194)
//   .then((result) => console.log(result));

searchSubjects(event, {
  name: 'vic'
});

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
