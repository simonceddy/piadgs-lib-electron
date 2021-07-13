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

export const saveTitle = (title = {}, callback) => (dispatch) => Promise
  .resolve(dispatch(
    createTitle(title)
      .then((result) => {
        console.log(result);
        if (typeof callback === 'function') callback(result);
        return result;
      })
  ));

export const saveAllTitles = (titles = []) => (dispatch) => Promise.all(
  titles.map((title) => saveTitle(title))
).then(() => dispatch({}));
