// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const login = require('./controllers/login');
const { searchTitles } = require('./controllers/searchTitles');
const searchAuthors = require('./controllers/searchAuthors');
const getAll = require('./controllers/getAll');
const searchSubjects = require('./controllers/searchSubjects');
const getFrom = require('./controllers/getId');

ipcMain.on('search-titles', (event, params) => searchTitles(event, params));
ipcMain.on('search-authors', (event, params) => searchAuthors(event, params));
ipcMain.on('search-subjects', (event, params) => searchSubjects(event, params));

ipcMain.on('get-titles', (ev) => getAll(ev, 'titles', 'send-titles'));
ipcMain.on('get-subjects', (ev) => getAll(ev, 'subjects', 'send-subjects'));
ipcMain.on('get-authors', (ev) => getAll(ev, 'authors', 'send-authors'));

ipcMain.on('get-subject', (event, params) => getFrom('subjects', params)
  .then((result) => {
    console.log(result);
    event.reply('fetched-subject', result);
  })
  .catch(console.log));

ipcMain.on('login', (event, { username, password }) => login({ username, password }, event));
