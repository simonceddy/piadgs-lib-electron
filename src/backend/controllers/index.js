const getAll = require('./getAll');
const getFrom = require('./getFrom');
const countModels = require('./countModels');
const loginController = require('./loginController');
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
const deleteAuthor = require('./deleteAuthor');
const deleteSubject = require('./deleteSubject');
const deleteTitle = require('./deleteTitle');

const countAuthorsForTitle = () => {};

const controllers = {
  getAll,
  getFrom,
  countModels,
  countAuthorsForTitle,
  loginController,
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
  getAllSubjects,
  deleteAuthor,
  deleteSubject,
  deleteTitle,
};

module.exports = controllers;
