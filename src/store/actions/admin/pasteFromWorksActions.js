import axios from 'axios';
import { addErrorMessage } from '../errorsActions';
import transformTextFromWorks from '../../../util/transformTextFromWorks';

export const SET_CURRENT_TEXT = 'SET_CURRENT_TEXT';
export const SET_PROCESSED_RESULTS = 'SET_PROCESSED_RESULTS';
export const SET_SHOW_ONLY_ISSUES = 'SET_SHOW_ONLY_ISSUES';
export const SET_IS_PROCESSED = 'SET_IS_PROCESSED';
export const CLEAR_PROCESSED = 'CLEAR_PROCESSED';
export const REMOVE_PROCESSED_BY_ID = 'REMOVE_PROCESSED_BY_ID';
export const UPDATE_PROCESSED_BY_ID = 'UPDATE_PROCESSED_BY_ID';

export const setCurrentText = (currentText) => ({
  type: SET_CURRENT_TEXT,
  payload: { currentText }
});

export const setProcessedResults = (results) => ({
  type: SET_PROCESSED_RESULTS,
  payload: { results }
});

export const setShowOnlyIssues = () => ({
  type: SET_SHOW_ONLY_ISSUES
});

export const setIsProcessed = (isProcessed) => ({
  type: SET_IS_PROCESSED,
  payload: { isProcessed }
});

export const clearProcessed = () => ({
  type: CLEAR_PROCESSED
});

export const clearCurrentText = () => ({
  type: SET_CURRENT_TEXT,
  payload: { currentText: '' }
});

export const removeProcessedById = (id) => ({
  type: REMOVE_PROCESSED_BY_ID,
  payload: { id }
});

export const updateProcessById = (id, data) => ({
  type: UPDATE_PROCESSED_BY_ID,
  payload: { id, data }
});

export const clearAll = () => (dispatch) => Promise.resolve(dispatch(clearCurrentText()))
  .then(dispatch(clearProcessed()));

export const processCurrentText = () => (dispatch, getState) => Promise.resolve(
  dispatch(
    setProcessedResults(
      transformTextFromWorks(getState().admin.pasteFromWorks.currentText)
    )
  )
)
  .then(() => dispatch(setIsProcessed(true)));

export const postManyConvertedTitles = (data) /* => (dispatch) */ => {
  console.log(data);
  axios.post('/titles/createMany', { data })
    .then((res) => console.log(res));
  // return dispatch();
};

export const postConvertedTitle = (index) => (dispatch, getState) => {
  const key = Number(index);

  const data = getState().admin.pasteFromWorks.processedResults.filter(
    (title, id) => key === id
  )[0];

  // TODO handle no data
  axios.post('/titles/create', data)
    .then((res) => {
      console.log(res.status);
      if (res.status !== 200 || !res.data.success) {
        return dispatch(addErrorMessage('There was an error saving!'));
      }
      return dispatch(removeProcessedById(key));
    })
    .catch((err) => dispatch(addErrorMessage(err.message)));
};
