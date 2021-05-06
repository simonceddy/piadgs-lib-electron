// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite', (err) => {
  if (err) console.error('Database opening error: ', err);
});

ipcMain.on('asynchronous-message', (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply('asynchronous-reply', (err && err.message) || rows);
  });
});
