const getAll = require('./getAll');
const getFrom = require('./getFrom');
const countModels = require('./countModels');
const login = require('./login');
const searchAuthors = require('./searchAuthors');
const searchSubjects = require('./searchSubjects');
const searchLibrary = require('./searchLibrary');
const searchTitles = require('./searchTitles');
const updateSubject = require('./updateSubject');
const updateTitle = require('./updateTitle');
const getAllTitles = require('./getAllTitles');
const getAllAuthors = require('./getAllAuthors');
const getAllSubjects = require('./getAllSubjects');
const createTitle = require('./createTitle');
const createAuthor = require('./createAuthor');
const createSubject = require('./createSubject');

const countAuthorsForTitle = () => {};

module.exports = {
  getAll,
  getFrom,
  countModels,
  countAuthorsForTitle,
  login,
  searchAuthors,
  searchSubjects,
  searchLibrary,
  searchTitles,
  updateSubject,
  updateTitle,
  getAllTitles,
  createTitle,
  createAuthor,
  createSubject,
  getAllAuthors,
  getAllSubjects
};
