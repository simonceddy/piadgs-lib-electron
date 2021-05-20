import { searchLibraryAuthors } from '../../../message-control/controllers';
import { flipDirection } from '../../../util/sort';

export const SET_AUTHORS_SEARCH_INPUT = 'SET_AUTHORS_SEARCH_INPUT';
export const SET_AUTHORS_SEARCH_RESULTS = 'SET_AUTHORS_SEARCH_RESULTS';
export const SET_AUTHORS_SORT_AUTHORS = 'SET_AUTHORS_SORT_AUTHORS';

export const setAuthorsSearchInput = (input) => ({
  type: SET_AUTHORS_SEARCH_INPUT,
  payload: { input }
});

export const setAuthorsSearchResults = (results) => ({
  type: SET_AUTHORS_SEARCH_RESULTS,
  payload: { results }
});

export const setSortAuthorsSearch = (sortCol, sortDirection) => ({
  type: SET_AUTHORS_SORT_AUTHORS,
  payload: { sortCol, sortDirection }
});

export const fetchAuthorsSearchResults = (name) => (
  dispatch, getState
) => {
  const { sortCol, sortDirection, } = getState().authors.authorSearch;

  return searchLibraryAuthors({
    name,
    sortColumn: sortCol,
    sortDirection,
  })
    .then((res) => {
      if (!res.results || res.results.length < 1) {
        return dispatch(setAuthorsSearchResults([]));
      }
      // console.log(sortCol, sortDirection, sorted);
      return dispatch(setAuthorsSearchResults(res.results));
    })
    .catch(console.log);
};

export const sortAuthorsResultRows = (col) => (dispatch, getState) => {
  const { sortCol, sortDirection, input } = getState().authors.authorSearch;
  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setSortAuthorsSearch(col, direction)))
    .then(() => dispatch(fetchAuthorsSearchResults(input)));
};
