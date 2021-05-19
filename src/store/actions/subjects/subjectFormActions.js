import { createSubject } from '../../../message-control/controllers';
import { setSubjectMessage } from './subjectActions';

export const SET_SUBJECT_FORM_INPUT = 'SET_SUBJECT_FORM_INPUT';
export const SET_SUBJECT_FORM_TILES = 'SET_SUBJECT_FORM_TILES';

export const setSubjectFormInput = (input) => ({
  type: SET_SUBJECT_FORM_INPUT,
  payload: { input }
});

export const setSubjectFormTitles = (titles) => ({
  type: SET_SUBJECT_FORM_TILES,
  payload: { titles }
});

export const clearSubjectForm = () => (dispatch) => Promise
  .resolve(dispatch(setSubjectFormInput({ name: '' })))
  .then(() => dispatch(setSubjectFormTitles([])));

export const saveSubject = () => (dispatch, getState) => {
  const { input, titles } = getState().subjects.subjectForm;

  return Promise.resolve(createSubject({ ...input, titles }))
    .then((result) => {
      console.log(result);
      if (!result.success) {
        return dispatch(setSubjectMessage('An error occurred trying to save the subject!'));
      }
      return dispatch(setSubjectMessage(`Saved successfully with ID ${result.id[0]}`));
    });
};

export const addSubjectTitle = (title) => (dispatch, getState) => dispatch(
  setSubjectFormTitles([
    ...getState().subjects.subjectform.titles,
    title
  ])
);
