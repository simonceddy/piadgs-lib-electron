// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const login = require('./login');
const db = require('./db');
const { searchTitles } = require('./controllers/searchTitles');
const searchAuthors = require('./controllers/searchAuthors');

ipcMain.on('search-titles', (event, params) => {
  searchTitles(params, event);
});
ipcMain.on('search-authors', (event, params) => {
  searchAuthors(params, event);
});

ipcMain.on('get-titles', (event) => {
  db.from('titles').select()
    .then((rows) => event.reply('send-titles', rows))
    .catch((err) => event.reply('send-titles', err.message));
});

ipcMain.on('get-subjects', (event) => {
  db.from('subjects').select()
    .then((rows) => event.reply('send-subjects', rows))
    .catch((err) => event.reply('send-subjects', err.message));
});

ipcMain.on('login', (event, { username, password }) => {
  login({ username, password }, event);
});
