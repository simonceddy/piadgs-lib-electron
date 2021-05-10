import {
  updateSubjectData,
  getLibrarySubject
} from '../../../message-control/controllers';

export const SET_SUBJECT_SELECTED_TITLES = 'SET_SUBJECT_SELECTED_TITLES';
export const SET_SUBJECT_NAME = 'SET_SUBJECT_NAME';
export const SET_SUBJECT_DATA = 'SET_SUBJECT_DATA';
export const SET_SUBJECT_MESSAGE = 'SET_SUBJECT_MESSAGE';
export const RESET_SUBJECT = 'RESET_SUBJECT';

export const resetSubject = () => ({
  type: RESET_SUBJECT
});

export const setSubjectSelectedTitles = (selectedTitles) => ({
  type: SET_SUBJECT_SELECTED_TITLES,
  payload: { selectedTitles }
});

export const setSubjectName = (name) => ({
  type: SET_SUBJECT_NAME,
  payload: { name }
});

export const setSubjectData = (data) => ({
  type: SET_SUBJECT_DATA,
  payload: { data }
});

export const setSubjectMessage = (message) => ({
  type: SET_SUBJECT_MESSAGE,
  payload: { message }
});

export const updateSubject = (data) => (dispatch, getState) => {
  console.log(getState().subjects.subject.selectedTitles);
  const dataWithTitles = {
    ...data,
    titles: Object.keys(getState().subjects.subject.selectedTitles)
  };
  return updateSubjectData(dataWithTitles)
    .then((res) => {
      console.log(res);
      // TODO handle response
      if (!res.data.data) {
        return dispatch(setSubjectMessage('Error retrieving updated data!'));
      }
      return Promise.resolve(dispatch(setSubjectData(res.data.data)))
        .then(() => dispatch(setSubjectMessage('Changes saved successfully!')))
        .catch((err) => dispatch(setSubjectMessage(`Error: ${err.message}`)));
    })
    .catch((err) => {
      console.log(err);
      return dispatch(setSubjectData({}));
    });
};

export const setData = (data = {}) => (dispatch) => Promise.resolve(
  dispatch(setSubjectData(data))
)
  .then(() => Promise.resolve(dispatch(setSubjectName(data.name))))
  .then(() => dispatch(setSubjectSelectedTitles(
    Object.fromEntries(data.titles.map(({ id: titleId }) => [titleId, true]))
  )));

export const fetchSubject = (id) => (dispatch) => getLibrarySubject({ id })
  .then((res) => dispatch(setData(res)))
  .catch((err) => {
    console.log(err);
    return dispatch(setSubjectData({}));
  });
