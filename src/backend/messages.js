// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const {
  searchLibrary,
  login,
  searchAuthors,
  searchSubjects,
  getAll,
  getFrom,
  getAllTitles,
  searchTitles
} = require('./controllers');
const countModels = require('./controllers/countModels');
const getAuthorTitles = require('./helpers/getAuthorTitles');
const getSubjectTitles = require('./helpers/getSubjectTitles');
const loadTitleRelations = require('./helpers/loadTitleRelations');

ipcMain.on('search-library', (event, params) => searchLibrary(event, params));
ipcMain.on('search-authors', (event, params) => searchAuthors(event, params));
ipcMain.on('search-subjects', (event, params) => searchSubjects(event, params));
ipcMain.on('search-titles', (event, params) => searchTitles(event, params));

ipcMain.on('count-titles', (ev) => countModels('titles', (results) => ev.reply('send-titles-count', results)));
ipcMain.on('count-authors', (ev) => countModels('authors', (results) => ev.reply('send-authors-count', results)));
ipcMain.on('count-subjects', (ev) => countModels('subjects', (results) => ev.reply('send-subjects-count', results)));

ipcMain.on('get-titles', (ev) => getAllTitles(ev));
ipcMain.on('get-subjects', (ev) => getAll(ev, 'subjects', 'send-subjects'));
ipcMain.on('get-authors', (ev) => getAll(ev, 'authors', 'send-authors'));

ipcMain.on('get-title', (event, params) => getFrom('titles', params)
  .then((title) => loadTitleRelations(title))
  .then((result) => event.reply('fetched-title', result)));

ipcMain.on('get-subject', (event, params) => getFrom('subjects', params)
  .then((result) => {
    console.log(result);
    if (result.id) {
      return getSubjectTitles(result)
        .then((titles) => {
          event.reply('fetched-subject', { ...result, titles });
        });
    }
    return event.reply('fetched-subject', result);
  })
  .catch(console.log));

ipcMain.on('get-author', (event, params) => getFrom('authors', params)
  .then((author) => getAuthorTitles(author)
    .then((titles) => ({ ...author, titles }))
    .catch((err) => event.reply('fetched-author', err)))
  .then((result) => event.reply('fetched-author', result))
  .catch((err) => event.reply('fetched-author', err)));

ipcMain.on('login', (event, { username, password }) => login({ username, password }, event));
