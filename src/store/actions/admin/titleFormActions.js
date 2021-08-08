export const SET_TITLE_FORM_VALUES = 'SET_TITLE_FORM_VALUES';
export const RESET_TITLE_FORM = 'RESET_TITLE_FORM';
export const SET_TITLE_FORM_SUBMITTED = 'SET_TITLE_FORM_SUBMITTED';
export const ADD_AUTHOR_TO_TITLE = 'ADD_AUTHOR_TO_TITLE';
export const REMOVE_AUTHOR_FROM_TITLE = 'REMOVE_AUTHOR_FROM_TITLE';
export const ADD_SUBJECT_TO_TITLE = 'ADD_SUBJECT_TO_TITLE';
export const REMOVE_SUBJECT_FROM_TITLE = 'REMOVE_SUBJECT_FROM_TITLE';
export const SET_EDITING_TITLE = 'SET_EDITING_TITLE';
export const CLEAR_TITLE_FORM_VALUES = 'CLEAR_TITLE_FORM_VALUES';

export const clearTitleFormValues = () => ({
  type: CLEAR_TITLE_FORM_VALUES
});

export const setEditingTitle = (isEditing = false) => ({
  type: SET_EDITING_TITLE,
  payload: { isEditing }
});

export const setTitleFormValues = (values) => ({
  type: SET_TITLE_FORM_VALUES,
  payload: { values }
});

export const resetTitleForm = () => ({
  type: RESET_TITLE_FORM
});

export const setTitleFormSubmitted = () => ({
  type: SET_TITLE_FORM_SUBMITTED
});

export const submitNewTitle = () => (dispatch, getState) => {
  console.log(getState().admin.titleForm.values);
  return dispatch(setTitleFormSubmitted());
};

export const submitUpdatedTitle = (id) => (dispatch, getState) => {
  console.log(getState().admin.titleForm.values, id);
  return dispatch(setTitleFormSubmitted());
};

export const addAuthorToTitle = (author) => ({
  type: ADD_AUTHOR_TO_TITLE,
  payload: { author }
});

export const addSubjectToTitle = (subject) => ({
  type: ADD_SUBJECT_TO_TITLE,
  payload: { subject }
});

export const removeAuthorFromTitle = (id) => ({
  type: REMOVE_AUTHOR_FROM_TITLE,
  payload: { id }
});

export const removeSubjectFromTitle = (id) => ({
  type: REMOVE_SUBJECT_FROM_TITLE,
  payload: { id }
});
