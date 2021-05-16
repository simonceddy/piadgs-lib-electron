import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibraryTitle = (params) => controllerMessage(
  types.getTitle.send,
  types.getTitle.reply,
  params
);

export const searchLibraryTitles = (params) => controllerMessage(
  types.searchTitles.send,
  types.searchTitles.reply,
  params
);

export const getTitles = () => controllerMessage(
  types.getAllTitles.send,
  types.getAllTitles.reply,
);

export const countTitles = () => controllerMessage(
  types.countTitles.send,
  types.countTitles.reply
);

export const createTitles = (params) => controllerMessage('create-titles', 'send-titles-created', params);

export const createTitle = (params) => controllerMessage(
  types.createTitle.send,
  types.createTitle.reply,
  params
);
