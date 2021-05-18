import { getTitles, countTitles } from '../../../message-control/controllers';
// import { paginate } from '../../../util/paginate';
import { flipDirection, sortTitles } from '../../../util/sort';

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

export const setTitlesSort = (sortColumn, sortDirection) => ({
  type: SET_TITLES_SORT,
  payload: { sortColumn, sortDirection }
});

// Local sorting
export const sortAndSetTitles = (data) => (dispatch, getState) => {
  const { sortColumn, sortDirection } = getState().titles.titles;

  const sorted = sortTitles(data, sortColumn);

  return dispatch(setTitlesData(sortDirection === 'ASC' ? sorted : sorted.reverse()));
};

export const fetchTitlesData = () => async (dispatch, getState) => {
  const {
    currentPage, itemsPerPage, sortColumn, sortDirection
  } = getState().titles.titles;
  const total = await countTitles()
    .catch(console.log);
  return getTitles(currentPage, itemsPerPage, sortColumn, sortDirection)
    .then((result) => Promise.resolve(dispatch(setLastPage(Math.ceil(total / itemsPerPage))))
      .then(() => dispatch(setTitlesData(result))))
    .catch((err) => console.log(err));
};

export const sortTitleRows = (col) => (dispatch, getState) => {
  const { sortColumn, sortDirection } = getState().titles.titles;
  const direction = col === sortColumn ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setTitlesSort(col, direction)))
    .then(() => dispatch(fetchTitlesData()));
};
