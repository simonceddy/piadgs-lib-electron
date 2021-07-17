import converInputToModels from '../../util/convertInputToModels';

export const SET_UNCONVERTED_TEXT_INPUT = 'SET_UNCONVERTED_TEXT_INPUT';
export const SET_CONVERTED_TITLES = 'SET_CONVERTED_TITLES';
export const SET_SHOW_ONLY_ISSUES = 'SET_SHOW_ONLY_ISSUES';
// export const SET_IS_PROCESSED = 'SET_IS_PROCESSED';
export const CLEAR_TITLES = 'CLEAR_TITLES';
export const PROCESSED_TITLE_SAVED = 'PROCESSED_TITLE_SAVED';

export const processedTitleSaved = (id) => ({
  type: PROCESSED_TITLE_SAVED,
  payload: { id }
});

export const setUnconvertedTextInput = (input) => ({
  type: SET_UNCONVERTED_TEXT_INPUT,
  payload: { input }
});

export const setConvertedTitles = (titles) => ({
  type: SET_CONVERTED_TITLES,
  payload: { titles }
});

export const setShowOnlyIssues = () => ({
  type: SET_SHOW_ONLY_ISSUES
});

// export const setIsProcessed = (isProcessed) => ({
//   type: SET_IS_PROCESSED,
//   payload: { isProcessed }
// });

export const clearTitles = () => ({
  type: CLEAR_TITLES
});

export const clearUnconvertedTextInput = () => ({
  type: SET_UNCONVERTED_TEXT_INPUT,
  payload: { input: '' }
});

export const removeConvertedByIndex = (index) => (dispatch, getState) => {
  const titles = getState().worksToDb.titles.filter(({ id }) => id !== index);

  return dispatch(setConvertedTitles(titles));
};

export const updateConvertedByIndex = (index, data = {}) => (dispatch, getState) => {
  const titles = getState().worksToDb.titles.map((title) => {
    if (title.id === index) return data;
    return title;
  });

  return dispatch(setConvertedTitles(titles));
};

export const processInputText = () => (dispatch, getState) => {
  const titles = converInputToModels(getState().worksToDb.input);

  return dispatch(setConvertedTitles(titles));
};
