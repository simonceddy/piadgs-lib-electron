import { searchLibraryAuthors } from '../../../message-control/controllers';
import { sortPropAZ, sortPropLength } from '../../../util/sort';

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

export const setSortAuthorsSearch = (col, direction) => ({
  type: SET_AUTHORS_SORT_AUTHORS,
  payload: { col, direction }
});

const flipDirection = (direction) => (direction === 'ASC' ? 'DESC' : 'ASC');

const sortCols = (key, data) => {
  switch (key) {
    case 'titles':
      return sortPropLength(data, 'titles');
    default:
      return sortPropAZ(data, key);
  }
};

export const fetchAuthorsSearchResults = (name) => (
  dispatch, getState
) => searchLibraryAuthors({ name })
  .then((res) => {
    const { sortCol, sortDirection } = getState().authors.authorSearch;

    if (!res.results || res.results.length < 1) {
      return dispatch(setAuthorsSearchResults([]));
    }

    const sorted = sortCols(sortCol, res.results);
    // console.log(sortCol, sortDirection, sorted);
    return dispatch(setAuthorsSearchResults(
      sortDirection === 'DESC'
        ? sorted.reverse()
        : sorted
    ));
  })
  .catch(console.log);

export const sortAuthorSearchResults = (key) => async (dispatch, getState) => {
  const { results, sortCol, sortDirection } = getState().authors.authorSearch;
  const isSameKey = key === sortCol;
  // console.log(sortDirection, isSameKey);

  const direction = isSameKey ? flipDirection(sortDirection) : sortDirection;

  return Promise.resolve(dispatch(setSortAuthorsSearch(
    key,
    direction
  )))
    .then(() => {
      const sorted = sortCols(key, results);

      return dispatch(setAuthorsSearchResults(
        direction === 'DESC'
          ? sorted.reverse()
          : sorted
      ));
    })
    .catch((err) => console.log(err));
};
