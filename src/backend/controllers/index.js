const getAll = require('./getAll');
const getFrom = require('./getFrom');
const countModels = require('./countModels');
const login = require('./login');
const searchAuthors = require('./searchAuthors');
const searchSubjects = require('./searchSubjects');
const searchTitles = require('./searchTitles');
const updateSubject = require('./updateSubject');
const getAllTitles = require('./getAllTitles');

module.exports = {
  getAll,
  getFrom,
  countModels,
  login,
  searchAuthors,
  searchSubjects,
  searchTitles,
  updateSubject,
  getAllTitles,
};
