import controllerMessage from './controllerMessage';

export const getLibraryTitle = (params) => controllerMessage(
  'get-title',
  'fetched-title',
  params
);

export const searchLibraryTitles = (params) => controllerMessage(
  'search-titles',
  'titles-search-results',
  params
);

export const getTitles = () => controllerMessage('get-titles', 'send-titles');

export const countTitles = () => controllerMessage('count-titles', 'send-titles-count');

export const createTitles = (params) => controllerMessage('create-titles', 'send-titles-created', params);
