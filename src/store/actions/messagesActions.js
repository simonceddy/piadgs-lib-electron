export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const clearMessage = (type) => ({
  type: CLEAR_MESSAGE,
  payload: { type }
});
