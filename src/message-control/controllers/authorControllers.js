import controllerMessage from './controllerMessage';

export const getLibraryAuthor = (params) => controllerMessage(
  'get-author',
  'fetched-author',
  params
);
export const searchLibraryAuthors = (params) => controllerMessage(
  'search-authors',
  'authors-search-results',
  params
);
export const getAuthors = () => controllerMessage('get-authors', 'send-authors');
export const countAuthors = () => controllerMessage('count-authors', 'send-authors-count');
