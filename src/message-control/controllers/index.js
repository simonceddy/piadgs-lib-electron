const electron = window.require('electron');
const { ipcRenderer } = electron;

const controllerMessage = (sendType, returnType, ...args) => new Promise((resolve) => {
  ipcRenderer.once(returnType, (_, arg) => {
    // console.log(arg);
    resolve(arg);
  });
  ipcRenderer.send(sendType, ...args);
});

export const getLibraryTitle = (params) => controllerMessage(
  'get-title',
  'fetched-title',
  params
);

export const getLibrarySubject = (params) => controllerMessage(
  'get-subject',
  'fetched-subject',
  params
);

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

export const getAuthors = () => controllerMessage('get-authors', 'send-authors');

export const updateSubjectData = (params) => controllerMessage('update-subject', 'update-subject-result', params);

export const attemptLogin = (args) => controllerMessage('login', 'login-result', args);
