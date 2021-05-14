import controllerMessage from './controllerMessage';

export * from './titleControllers';
export * from './authorControllers';
export * from './subjectControllers';

export const searchLibrary = (params) => controllerMessage(
  'search-library',
  'library-search-results',
  params
);

export const attemptLogin = (args) => controllerMessage('login', 'login-result', args);
