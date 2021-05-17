import { getAuthors } from '../../../message-control/controllers';

export const SET_AUTHORS_DATA = 'SET_AUTHORS_DATA';
export const SET_SORT_AUTHORS = 'SET_SORT_AUTHORS';

export const setSortAuthors = (sortCol, sortDirection) => ({
  type: SET_SORT_AUTHORS,
  payload: { sortCol, sortDirection }
});

export const setAuthorsData = (data) => ({
  type: SET_AUTHORS_DATA,
  payload: { data }
});

export const fetchAuthors = () => (dispatch) => getAuthors()
  .then((res) => {
    console.log(res);
    return dispatch(setAuthorsData(res));
  })
  .catch((err) => console.log(err));
