// import axios from 'axios';
import { getTitles } from '../../../message-control/controllers';
// import { isArray } from 'lodash';
// import makeSearchQuery from '../../../util/makeSearchQuery';
import { paginate } from '../../../util/paginate';
import { sortTitles } from '../../../util/sort';

export const FETCH_TITLES_DATA = 'FETCH_TITLES_DATA';
export const SET_TITLES_DATA = 'SET_TITLES_DATA';
export const SET_TITLES_SORT = 'SET_TITLES_SORT';
export const SET_LAST_PAGE = 'SET_LAST_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE';

export const setItemsPerPage = (itemsPerPage) => ({
  type: SET_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

export const setLastPage = (lastPage) => ({
  type: SET_LAST_PAGE,
  payload: { lastPage }
});

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: { currentPage }
});

export const setTitlesData = (titles = []) => ({
  type: SET_TITLES_DATA,
  payload: { titles }
});

export const setTitlesSort = ({ sortColumn, sortDirection }) => ({
  type: SET_TITLES_SORT,
  payload: { sortColumn, sortDirection }
});

export const sortAndSetTitles = (data) => (dispatch, getState) => {
  const { sortColumn, sortDirection, itemsPerPage } = getState().titles.titles;

  const sorted = sortTitles(data, sortColumn);

  return dispatch(setTitlesData(paginate(
    sortDirection === 'ASC' ? sorted : sorted.reverse(),
    itemsPerPage || 32
  )));
};

export const fetchTitlesData = () => (dispatch) => getTitles()
  .then((result) => dispatch(sortAndSetTitles(result)))
  .catch((err) => console.log(err));

// export function sortTitles(
//   { sortColumn, sortDirection },
//   callback = () => null
// ) {
//   return (dispatch, getState) => Promise.resolve(dispatch(setTitlesSort({
//     sortColumn,
//     sortDirection
//   })))
//     .then(() => callback(getState))
//     .catch((err) => console.log(err));
// }
