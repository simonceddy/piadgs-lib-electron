export const SET_AUTHOR_FORM_INPUT = 'SET_AUTHOR_FORM_INPUT';
export const SET_AUTHOR_FORM_TILES = 'SET_AUTHOR_FORM_TILES';

export const setAuthorFormInput = (input) => ({
  type: SET_AUTHOR_FORM_INPUT,
  payload: { input }
});

export const setAuthorFormTitles = (titles) => ({
  type: SET_AUTHOR_FORM_TILES,
  payload: { titles }
});
