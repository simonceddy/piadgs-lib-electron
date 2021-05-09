const electron = window.require('electron');
const { ipcRenderer } = electron;

const controllerMessage = (sendType, returnType, ...args) => new Promise((resolve) => {
  ipcRenderer.once(returnType, (_, arg) => {
    resolve(arg);
  });
  ipcRenderer.send(sendType, ...args);
});

export const getTitles = () => controllerMessage('get-titles', 'send-titles');

export const getSubjects = () => controllerMessage('get-subjects', 'send-subjects');

export const attemptLogin = (args) => controllerMessage('login', 'login-result', args);
