// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const login = require('./login');

const database = new sqlite3.Database('./public/database.sqlite', (err) => {
  if (err) console.error('Database opening error: ', err);
});

ipcMain.on('asynchronous-message', (event, arg) => {
  const sql = arg;
  console.log(event, arg);
  database.all(sql, (err, rows) => {
    event.reply('asynchronous-reply', (err && err.message) || rows);
  });
});

ipcMain.on('get-titles', (event) => {
  database.all('SELECT * FROM titles', (err, rows) => {
    event.reply('send-titles', (err && err.message) || rows);
  });
});

ipcMain.on('get-subjects', (event) => {
  database.all('SELECT * FROM subjects', (err, rows) => {
    event.reply('send-subjects', (err && err.message) || rows);
  });
});

ipcMain.on('login', (event, args) => {
  login(args, event);
});
