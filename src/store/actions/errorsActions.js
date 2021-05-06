export const ADD_ERROR_MESSAGE = 'ADD_ERROR_MESSAGE';
export const CLEAR_MESSAGE_BY_ID = 'CLEAR_MESSAGE_BY_ID';
export const TOGGLE_ERRORS_MODAL = 'TOGGLE_ERRORS_MODAL';

export const addErrorMessage = (message) => ({
  type: ADD_ERROR_MESSAGE,
  payload: { message }
});

export const clearMessageById = (id) => ({
  type: CLEAR_MESSAGE_BY_ID,
  payload: { id }
});

export const showErrors = () => ({
  type: TOGGLE_ERRORS_MODAL
});
