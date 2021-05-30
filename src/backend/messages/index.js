// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
// eslint-disable-next-line no-unused-vars
const types = require('../messageTypes');
const {
  searchLibrary,
  login,
  searchAuthors,
  searchSubjects,
  getFrom,
  getAllTitles,
  searchTitles,
  createAuthor,
  createTitle,
  createSubject,
  getAllAuthors,
  getAllSubjects,
  updateTitle
} = require('../controllers');
const countModels = require('../controllers/countModels');
const getAuthorTitles = require('../helpers/getAuthorTitles');
const getSubjectTitles = require('../helpers/getSubjectTitles');
const loadTitleRelations = require('../helpers/loadTitleRelations');

ipcMain.on(
  types.searchLibrary.send,
  (event, params) => {
    console.log(params);
    return searchLibrary(event, params);
  }
);
ipcMain.on(
  types.searchAuthors.send,
  (event, params) => searchAuthors(event, params)
);
ipcMain.on(
  types.searchSubjects.send,
  (event, params) => searchSubjects(event, params)
);
ipcMain.on(
  types.searchTitles.send,
  (event, params) => searchTitles(event, params)
);

ipcMain.on(
  types.countTitles.send,
  (ev) => countModels('titles', (results) => ev.reply(types.countTitles.reply, results))
);
ipcMain.on(
  types.countAuthors.send,
  (ev) => countModels('authors', (results) => ev.reply(types.countAuthors.reply, results))
);
ipcMain.on(
  types.countSubjects.send,
  (ev) => countModels('subjects', (results) => ev.reply(types.countSubjects.reply, results))
);

ipcMain.on(
  types.getAllTitles.send,
  (ev, params) => getAllTitles(ev, params)
);
ipcMain.on(
  types.getAllSubjects.send,
  (ev, params) => getAllSubjects(ev, params)
);
ipcMain.on(
  types.getAllAuthors.send,
  (ev, params) => getAllAuthors(ev, params)
);

ipcMain.on(
  types.getTitle.send,
  (event, params) => getFrom('titles', params)
    .then((title) => loadTitleRelations(title))
    .then((result) => event.reply(types.getTitle.reply, result))
);

ipcMain.on(
  types.getSubject.send,
  (event, params) => getFrom('subjects', params)
    .then((result) => {
      console.log(result);
      if (result.id) {
        return getSubjectTitles(result)
          .then((titles) => {
            event.reply(types.getSubject.reply, { ...result, titles });
          });
      }
      return event.reply(types.getSubject.reply, result);
    })
    .catch(console.log)
);

ipcMain.on(
  types.getAuthor.send,
  (event, params) => getFrom('authors', params)
    .then((author) => getAuthorTitles(author)
      .then((titles) => ({ ...author, titles }))
      .catch((err) => event.reply(types.getAuthor.reply, err)))
    .then((result) => event.reply(types.getAuthor.reply, result))
    .catch((err) => event.reply(types.getAuthor.reply, err))
);

ipcMain.on(
  'login', (event, { username, password }) => login({ username, password }, event)
);

ipcMain.on(
  types.createTitle.send,
  (event, params) => createTitle(event, params)
);
ipcMain.on(
  types.createAuthor.send,
  (event, params) => createAuthor(event, params)
);
ipcMain.on(
  types.createSubject.send,
  (event, params) => createSubject(event, params)
);

ipcMain.on(types.updateTitle.send, (event, params) => updateTitle(event, params));
