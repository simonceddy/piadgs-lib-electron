import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibraryAuthor = (params) => controllerMessage(
  types.getAuthor.send,
  types.getAuthor.reply,
  params
);
export const searchLibraryAuthors = (params) => controllerMessage(
  types.searchAuthors.send,
  types.searchAuthors.reply,
  params
);
export const getAuthors = () => controllerMessage(
  types.getAllAuthors.send,
  types.getAllAuthors.reply,
);
export const countAuthors = () => controllerMessage(
  types.countAuthors.send,
  types.countAuthors.reply
);

export const createAuthor = (params) => controllerMessage(
  types.createAuthor.send,
  types.createAuthor.reply,
  params
);
