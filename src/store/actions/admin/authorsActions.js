import { getAuthors } from '../../../message-control/controllers';

export const SET_AUTHORS_DATA = 'SET_AUTHORS_DATA';

export const setAuthorsData = (data) => ({
  type: SET_AUTHORS_DATA,
  payload: { data }
});

export const fetchAuthors = () => (dispatch) => getAuthors()
  .then((res) => dispatch(setAuthorsData(res)))
  .catch((err) => console.log(err));
