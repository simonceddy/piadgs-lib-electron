/* eslint-disable no-unused-vars */
const { ipcMain } = require('electron');

module.exports = function initChannels(mainWindow) {
  ipcMain.on('search-library', (e, args) => {});
  ipcMain.on('read-channel', (e, args) => {
    console.log(args);
  });
  ipcMain.on('create-channel', (e, args) => {
    console.log(args);
  });
  ipcMain.on('update-channel', (e, args) => {
    console.log(args);
  });
  ipcMain.on('delete-channel', (e, args) => {
    console.log(args);
  });
};
