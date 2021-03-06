/* eslint-disable no-unused-vars */
const {
  searchTitles,
  searchAuthors,
  searchSubjects,
  getFrom,
  searchLibrary,
  getAllSubjects,
  getAllAuthors
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
    console.log(...args);
  }
};

getAllTitles(event, {
  itemsPerPage: 10,
  page: 1,
  sortColumn: 'created_at',
  sortDirection: 'DESC'
});

// db.from((sq) => sq.count('title_id', { as: 'titles' })
//   .where('subjects_titles.subject_id', 1450)
//   .from('subjects_titles'))
//   .leftOuterJoin('subjects', 'subjects_titles.subject_id', 'subjects.id')
//   .then((result) => console.log(result));

// SELECT s.id,
//        s.title
// FROM   song s
//        LEFT OUTER JOIN votes v
//                     ON s.id = v.songid
// GROUP  BY s.id,
//           s.title
// ORDER  BY Count(v.songid) DESC
// const testing = db('subjects')
//   .leftOuterJoin('subjects_titles', 'subjects.id', 'subjects_titles.subject_id')
//   .columns('subjects.id', 'subjects.name')
//   .modify((qb) => qb.count('subjects_titles.subject_id', { as: 'total' }))
//   .limit(19)
//   .groupBy('subjects.id', 'subjects.name')
//   .orderByRaw('total DESC');

// const q = db.count('subject_id', { as: 'subjects' }).from('subjects_titles');
// console.log(testing.toSQL());
// testing.then((res) => console.log(res));

// deleteModel('authors', 782);
// associate('subject', 'title', 1453, 1194)
//   .then((result) => console.log(result));

// searchAuthors(event, {
//   name: 'edd'
// });

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

// getTotal('titles')
//   .then((result) => console.log(Math.ceil(result / 10)));

// getAllAuthors(event, {
//   page: 1,
//   itemsPerPage: 10,
//   sortColumn: 'titles',
//   sortDirection: 'DESC'
// });
