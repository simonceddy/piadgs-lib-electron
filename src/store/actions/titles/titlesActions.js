import axios from 'axios';
import { getTitles } from '../../../message-control/controllers';
// import { isArray } from 'lodash';
import makeSearchQuery from '../../../util/makeSearchQuery';

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

const transformResponseData = (data = [], model = 'title') => {
  const titles = [];
  switch (model) {
    case 'authors':
    case 'subjects':
      data.map((item) => item.titles.map((title) => (titles.push({
        [model]: [item],
        ...title
      }))));
      return titles;
    default:
      return data;
  }
};

export const fetchTitlesData = (page = 3) => (dispatch, getState) => {
  getTitles().then((result) => console.log(result));

  const {
    sortColumn: sortBy, sortDirection: order, itemsPerPage
  } = getState().titles.titles;

  const queryString = makeSearchQuery({
    page,
    itemsPerPage,
    sortBy,
    order
  }).toString();

  return Promise.resolve(axios.get(`/titles?${queryString}`)
    .then(
      (res) => Promise.resolve(dispatch(
        setTitlesData(transformResponseData(res.data.data, sortBy))
      ))
        .then(
          () => Promise.resolve(dispatch(setLastPage(res.data.lastPage)))
            .then(() => dispatch(setCurrentPage(res.data.currentPage)))
        ),
      (err) => console.log(err)
    ))
    .catch((err) => console.log(err));
};

export function sortTitles(
  { sortColumn, sortDirection },
  callback = () => null
) {
  return (dispatch, getState) => Promise.resolve(dispatch(setTitlesSort({
    sortColumn,
    sortDirection
  })))
    .then(() => callback(getState))
    .catch((err) => console.log(err));
}
