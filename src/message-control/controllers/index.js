import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export * from './titleControllers';
export * from './authorControllers';
export * from './subjectControllers';

export const searchLibrary = (params) => controllerMessage(
  types.searchLibrary.send,
  types.searchLibrary.reply,
  params
);

export const attemptLogin = (args) => controllerMessage('login', 'login-result', args);
