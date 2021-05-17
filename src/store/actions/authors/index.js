export * from './authorSearchActions';
export * from './authorActions';
export * from './authorFormActions';

export const SET_AUTHOR_MESSAGE = 'SET_AUTHOR_MESSAGE';

export const setAuthorMessage = (message) => ({
  type: SET_AUTHOR_MESSAGE,
  payload: { message }
});
