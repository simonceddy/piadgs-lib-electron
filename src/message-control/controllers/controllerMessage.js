const electron = window.require('electron');
const { ipcRenderer } = electron;

const controllerMessage = (sendType, returnType, ...args) => new Promise((resolve) => {
  ipcRenderer.once(returnType, (_, arg) => {
    // console.log(arg);
    resolve(arg);
  });
  ipcRenderer.send(sendType, ...args);
});

export default controllerMessage;
