const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;

const path = require('path');
const isDev = require('electron-is-dev');
const Bootstrapper = require('../src/backend/bootstrapper');

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS; // NEW!

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
} // NEW!

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
} // NEW!

require('../src/backend');

let mainWindow;

app.setName('PIADGS Library');

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (!Bootstrapper.isBootstrapped()) console.log('Cannot find app directory!');
  // console.log(app);
  createWindow();

  // if (isDev) {
  //   installExtension(REACT_DEVELOPER_TOOLS)
  //     .then(name => console.log(`Added Extension:  ${name}`))
  //     .catch(error => console.log(`An error occurred: , ${error}`));
  // }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
