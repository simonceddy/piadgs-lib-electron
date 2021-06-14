import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export * from './titleControllers';
export * from './authorControllers';
export * from './subjectControllers';

export const searchLibrary = (params) => controllerMessage(
  types.searchLibrary,
  params
);

export const attemptLogin = (args) => controllerMessage({
  send: 'login', reply: 'login-result'
}, args);

export const logout = () => controllerMessage({
  send: 'logout',
  reply: 'logout-result'
});
