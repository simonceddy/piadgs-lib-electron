import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibraryTitle = (params) => controllerMessage(
  types.getTitle,
  params
);

export const searchLibraryTitles = (params) => controllerMessage(
  types.searchTitles,
  params
);

export const getTitles = (page, itemsPerPage, sortColumn, sortDirection) => controllerMessage(
  types.getAllTitles,
  {
    page, itemsPerPage, sortColumn, sortDirection
  }
);

export const countTitles = () => controllerMessage(
  types.countTitles,
);

export const createTitles = (params) => controllerMessage({
  send: 'create-titles',
  reply: 'send-titles-created'
}, params);

export const createTitle = (params) => controllerMessage(
  types.createTitle,
  params
);

export const updateTitle = (params) => controllerMessage(
  types.updateTitle,
  params
);

export const deleteTitle = (id) => controllerMessage(
  types.deleteTitle,
  { id }
);
