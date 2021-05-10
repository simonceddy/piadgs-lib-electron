const electron = window.require('electron');
const { ipcRenderer } = electron;

const controllerMessage = (sendType, returnType, ...args) => new Promise((resolve) => {
  ipcRenderer.once(returnType, (_, arg) => {
    // console.log(arg);
    resolve(arg);
  });
  ipcRenderer.send(sendType, ...args);
});

export const searchLibraryTitles = (params) => controllerMessage(
  'search-titles',
  'titles-search-results',
  params
);

export const searchLibraryAuthors = (params) => controllerMessage(
  'search-authors',
  'authors-search-results',
  params
);

export const searchLibrarySubjects = (params) => controllerMessage(
  'search-subjects',
  'subjects-search-results',
  params
);

export const getTitles = () => controllerMessage('get-titles', 'send-titles');

export const getSubjects = () => controllerMessage('get-subjects', 'send-subjects');

export const attemptLogin = (args) => controllerMessage('login', 'login-result', args);
