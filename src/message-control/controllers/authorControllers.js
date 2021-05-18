import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibraryAuthor = (params) => controllerMessage(
  types.getAuthor,
  params
);
export const searchLibraryAuthors = (params) => controllerMessage(
  types.searchAuthors,
  params
);
export const getAuthors = (params) => controllerMessage(
  types.getAllAuthors,
  params
);
export const countAuthors = () => controllerMessage(
  types.countAuthors
);

export const createAuthor = (params) => controllerMessage(
  types.createAuthor,
  params
);
