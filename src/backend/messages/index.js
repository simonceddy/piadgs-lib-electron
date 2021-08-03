// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
// eslint-disable-next-line no-unused-vars
const types = require('../messageTypes');
const controllers = require('../controllers');
const getAuthorTitles = require('../helpers/getAuthorTitles');
const getSubjectTitles = require('../helpers/getSubjectTitles');
const loadTitleRelations = require('../helpers/loadTitleRelations');
const authorize = require('../controllers/authorize');

const authMiddleware = (next) => (event, params) => authorize(event, params, next);

ipcMain.on(
  types.searchLibrary.send,
  (event, params) => {
    console.log(params);
    return controllers.searchLibrary(event, params);
  }
);
ipcMain.on(
  types.searchAuthors.send,
  controllers.searchAuthors
);
ipcMain.on(
  types.searchSubjects.send,
  controllers.searchSubjects
);
ipcMain.on(
  types.searchTitles.send,
  controllers.searchTitles
);

ipcMain.on(
  types.countTitles.send,
  (ev) => controllers.countModels(
    'titles',
    (results) => ev.reply(types.countTitles.reply, results),
  )
);
ipcMain.on(
  types.countAuthors.send,
  (ev, { filter = {} }) => controllers.countModels(
    'authors',
    (results) => ev.reply(types.countAuthors.reply, results),
    filter
  )
);
ipcMain.on(
  types.countSubjects.send,
  (ev, { filter = {} }) => controllers.countModels(
    'subjects',
    (results) => ev.reply(types.countSubjects.reply, results),
    filter
  )
);

ipcMain.on(
  types.getAllTitles.send,
  controllers.getAllTitles
);
ipcMain.on(
  types.getAllSubjects.send,
  controllers.getAllSubjects
);
ipcMain.on(
  types.getAllAuthors.send,
  controllers.getAllAuthors
);

ipcMain.on(
  types.getTitle.send,
  (event, params) => controllers.getFrom('titles', params)
    .then((title) => loadTitleRelations(title))
    .then((result) => event.reply(types.getTitle.reply, result))
);

ipcMain.on(
  types.getSubject.send,
  (event, params) => controllers.getFrom('subjects', params)
    .then((result) => {
      console.log(result);
      if (result && result.id) {
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
  (event, params) => controllers.getFrom('authors', params)
    .then((author) => getAuthorTitles(author)
      .then((titles) => ({ ...author, titles }))
      .catch((err) => event.reply(types.getAuthor.reply, err)))
    .then((result) => event.reply(types.getAuthor.reply, result))
    .catch((err) => event.reply(types.getAuthor.reply, err))
);

ipcMain.on(
  'login', (event, { username, password }) => controllers.loginController({ username, password }, event)
);

ipcMain.on(
  types.createTitle.send,
  authMiddleware(controllers.createTitle)
);

ipcMain.on(
  types.createAuthor.send,
  authMiddleware(controllers.createAuthor)
);

ipcMain.on(
  types.createSubject.send,
  authMiddleware(controllers.createSubject)
);
ipcMain.on(
  types.createSubjectTitle.send,
  authMiddleware(controllers.addSubjectToTitle)
);
ipcMain.on(
  types.createAuthorTitle.send,
  authMiddleware(controllers.addAuthorToTitle)
);

ipcMain.on(types.updateTitle.send, authMiddleware(controllers.updateTitle));
ipcMain.on(types.updateSubject.send, authMiddleware(controllers.updateSubject));
ipcMain.on(types.updateAuthor.send, authMiddleware(controllers.updateAuthor));

// console.log(ipcMain);
ipcMain.on(types.deleteAuthor.send, authMiddleware(controllers.deleteAuthor));
ipcMain.on(types.deleteSubject.send, authMiddleware(controllers.deleteSubject));
ipcMain.on(types.deleteTitle.send, authMiddleware(controllers.deleteTitle));
ipcMain.on(types.deleteAuthorTitle.send, authMiddleware(controllers.removeAuthorFromTitle));
ipcMain.on(types.deleteSubjectTitle.send, authMiddleware(controllers.removeSubjectFromTitle));
