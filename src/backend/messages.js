// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const {
  searchTitles,
  login,
  searchAuthors,
  searchSubjects,
  getAll,
  getFrom
} = require('./controllers');
const getAuthorTitles = require('./helpers/getAuthorTitles');
const getSubjectTitles = require('./helpers/getSubjectTitles');
const loadTitleRelations = require('./helpers/loadTitleRelations');

ipcMain.on('search-titles', (event, params) => searchTitles(event, params));
ipcMain.on('search-authors', (event, params) => searchAuthors(event, params));
ipcMain.on('search-subjects', (event, params) => searchSubjects(event, params));

ipcMain.on('get-titles', (ev) => getAll(ev, 'titles', 'send-titles'));
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
