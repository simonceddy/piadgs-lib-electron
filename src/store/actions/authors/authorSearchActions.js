import axios from 'axios';
import { sortPropAZ, sortPropLength } from '../../../util/sort';

export const SET_AUTHORS_SEARCH_INPUT = 'SET_AUTHORS_SEARCH_INPUT';
export const SET_AUTHORS_SEARCH_RESULTS = 'SET_AUTHORS_SEARCH_RESULTS';
export const SET_AUTHORS_SORT_AUTHORS = 'SET_AUTHORS_SORT_AUTHORS';

export const setSearchInput = (input) => ({
  type: SET_AUTHORS_SEARCH_INPUT,
  payload: { input }
});

export const setSearchResults = (results) => ({
  type: SET_AUTHORS_SEARCH_RESULTS,
  payload: { results }
});

export const setSortAuthors = (col, direction) => ({
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

export const fetchSearchResults = (name) => (dispatch, getState) => {
  console.log(name);
  return axios.get(`/authors/search?name=${name}`)
    .then((res) => {
      const { sortCol, sortDirection } = getState().authors.authorSearch;

      if (!res.data.results || res.data.results.length < 1) {
        return dispatch(setSearchResults([]));
      }

      const sorted = sortCols(sortCol, res.data.results);
      // console.log(sortCol, sortDirection, sorted);
      return dispatch(setSearchResults(
        sortDirection === 'DESC'
          ? sorted.reverse()
          : sorted
      ));
    })
    .catch((err) => console.log(err));
};

export const sortSearchResults = (key) => async (dispatch, getState) => {
  const { results, sortCol, sortDirection } = getState().authors.authorSearch;
  const isSameKey = key === sortCol;
  // console.log(sortDirection, isSameKey);

  const direction = isSameKey ? flipDirection(sortDirection) : sortDirection;

  return Promise.resolve(dispatch(setSortAuthors(
    key,
    direction
  )))
    .then(() => {
      const sorted = sortCols(key, results);

      return dispatch(setSearchResults(
        direction === 'DESC'
          ? sorted.reverse()
          : sorted
      ));
    })
    .catch((err) => console.log(err));
};
