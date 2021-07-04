import { createTitle, deleteTitle } from '../../../message-control/controllers';

export const removeTitle = (id) => (dispatch) => Promise
  .resolve(dispatch(
    deleteTitle(id)
  ))
  .then((result) => {
    console.log(result);
    return dispatch({});
  });

export const addAuthorsToTitle = (authors = []) => {
  console.log(authors);
};

export const addSubjectsToTitle = (subjects = []) => {
  console.log(subjects);
};

export const saveTitle = (title = {}) => (dispatch) => Promise
  .resolve(dispatch(
    createTitle(title)
  ))
  .then((result) => {
    console.log(result);
  });
