import { getAuthors } from '../../../message-control/controllers';
import { flipDirection } from '../../../util/sort';

export const SET_AUTHORS_DATA = 'SET_AUTHORS_DATA';
export const SET_SORT_AUTHORS = 'SET_SORT_AUTHORS';
export const SET_AUTHORS_CURRENT_PAGE = 'SET_AUTHORS_CURRENT_PAGE';
export const SET_AUTHORS_ITEMS_PER_PAGE = 'SET_AUTHORS_ITEMS_PER_PAGE';

export const setAuthorsItemsPerPage = (itemsPerPage) => ({
  type: SET_AUTHORS_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

export const setAuthorsCurrentPage = (currentPage) => ({
  type: SET_AUTHORS_CURRENT_PAGE,
  payload: { currentPage }
});
export const setSortAuthors = (sortCol, sortDirection) => ({
  type: SET_SORT_AUTHORS,
  payload: { sortCol, sortDirection }
});

export const setAuthorsData = (data) => ({
  type: SET_AUTHORS_DATA,
  payload: { data }
});

export const fetchAuthors = () => (dispatch, getState) => {
  console.log('fetching subjects');
  const {
    sortCol, sortDirection, currentPage, itemsPerPage
  } = getState().admin.authors;
  getAuthors({
    sortCol, sortDirection, currentPage, itemsPerPage
  })
    .then((res) => {
      console.log(res);
      return dispatch(setAuthorsData(res));
    })
    .catch((err) => console.log(err));
};

export const sortSubjectRows = (col) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().admin.authors;
  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setSortAuthors(col, direction)))
    .then(() => dispatch(fetchAuthors()));
};
