import handleClientError from '../../../handleClientError';
import { getTitles, countTitles } from '../../../message-control/controllers';
// import { paginate } from '../../../util/paginate';
import { flipDirection, sortTitles } from '../../../util/sort';

export const FETCH_TITLES_DATA = 'FETCH_TITLES_DATA';
export const SET_TITLES_DATA = 'SET_TITLES_DATA';
export const SET_TITLES_SORT = 'SET_TITLES_SORT';
export const SET_LAST_PAGE = 'SET_LAST_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE';
export const SET_TITLES_FILTER = 'SET_TITLES_FILTER';
export const SET_FILTERING_TITLES = 'SET_FILTERING_TITLES';

export const setTitlesFilter = (filter) => ({
  type: SET_TITLES_FILTER,
  payload: { filter }
});

export const setFilteringTitles = (filtering) => ({
  type: SET_FILTERING_TITLES,
  payload: { filtering }
});

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
    currentPage, itemsPerPage, sortColumn, sortDirection, filter
  } = getState().titles.titles;

  const total = await countTitles(filter)
    .catch(handleClientError);

  // TODO set currentPage if > lastPage
  const lastPage = Math.ceil(total / itemsPerPage);

  return getTitles({
    page: currentPage <= lastPage ? currentPage : lastPage,
    itemsPerPage,
    sortColumn,
    sortDirection,
    filter
  })
    .then((result) => Promise.resolve(dispatch(setLastPage(lastPage)))
      .then(() => dispatch(setTitlesData(result))))
    .catch(handleClientError);
};

export const sortTitleRows = (col) => (dispatch, getState) => {
  const { sortColumn, sortDirection } = getState().titles.titles;
  const direction = col === sortColumn ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setTitlesSort(col, direction)))
    .then(() => dispatch(fetchTitlesData()));
};
