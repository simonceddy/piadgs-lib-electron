// eslint-disable-next-line no-unused-vars
// import types from '../../backend/messageTypes';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const controllerMessage = ({ send = '', reply = '' }, ...args) => new Promise((resolve) => {
  ipcRenderer.once(reply, (_, arg) => {
    // console.log(send, arg);
    resolve(arg);
  });
  ipcRenderer.send(send, ...args);
});

export default controllerMessage;
