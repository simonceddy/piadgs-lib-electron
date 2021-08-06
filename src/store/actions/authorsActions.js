import {
  createAuthor, countAuthors, getAuthors, searchLibraryAuthors, updateAuthorData
} from '../../message-control/controllers';
import { flipDirection } from '../../util/sort';

export const SET_SELECTED_TITLES = 'SET_SELECTED_TITLES';
export const SET_AUTHOR_DATA = 'SET_AUTHOR_DATA';
export const SET_AUTHOR_FORM_INPUT = 'SET_AUTHOR_FORM_INPUT';
export const SET_AUTHOR_FORM_TILES = 'SET_AUTHOR_FORM_TILES';
export const SET_AUTHORS_DATA = 'SET_AUTHORS_DATA';
export const SET_SORT_AUTHORS = 'SET_SORT_AUTHORS';
export const SET_AUTHORS_CURRENT_PAGE = 'SET_AUTHORS_CURRENT_PAGE';
export const SET_AUTHORS_LAST_PAGE = 'SET_AUTHORS_LAST_PAGE';
export const SET_AUTHORS_ITEMS_PER_PAGE = 'SET_AUTHORS_ITEMS_PER_PAGE';
export const SET_AUTHORS_SEARCH_INPUT = 'SET_AUTHORS_SEARCH_INPUT';
export const SET_AUTHORS_SEARCH_RESULTS = 'SET_AUTHORS_SEARCH_RESULTS';
export const SET_AUTHORS_SORT_AUTHORS = 'SET_AUTHORS_SORT_AUTHORS';
export const SET_AUTHOR_MESSAGE = 'SET_AUTHOR_MESSAGE';
export const SET_FILTERING_AUTHORS = 'SET_FILTERING_AUTHORS';
export const SET_AUTHORS_FILTER = 'SET_AUTHORS_FILTER';

export const setAuthorMessage = (message) => ({
  type: SET_AUTHOR_MESSAGE,
  payload: { message }
});

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

export const setAuthorsItemsPerPage = (itemsPerPage) => ({
  type: SET_AUTHORS_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

export const setAuthorsLastPage = (lastPage) => ({
  type: SET_AUTHORS_LAST_PAGE,
  payload: { lastPage }
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

export const setAuthorFormInput = (input) => ({
  type: SET_AUTHOR_FORM_INPUT,
  payload: { input }
});

export const setAuthorFormTitles = (titles) => ({
  type: SET_AUTHOR_FORM_TILES,
  payload: { titles }
});

export const setSelectedTitles = (selectedTitles = []) => ({
  type: SET_SELECTED_TITLES,
  payload: { selectedTitles }
});

export const setAuthorData = (data) => ({
  type: SET_AUTHOR_DATA,
  payload: { data }
});

export const setFilteringAuthors = (filtering) => ({
  type: SET_FILTERING_AUTHORS,
  payload: { filtering }
});

export const setAuthorsFilter = (filter = {}) => ({
  type: SET_AUTHORS_FILTER,
  payload: { filter }
});

export const updateAuthor = (data) => (dispatch) => updateAuthorData(data)
  .then(() => dispatch(setAuthorData(data)))
  .catch(console.log);

export const saveAuthor = (author = {}) => (dispatch) => Promise
  .resolve(dispatch(
    createAuthor(author)
  ))
  .then((result) => {
    console.log(result);
  });

export const fetchAuthors = () => async (dispatch, getState) => {
  const {
    sortCol, sortDirection, currentPage, itemsPerPage, filter
  } = getState().admin.authors;

  // TODO fix names
  const total = await countAuthors({
    ...filter,
    given_names: filter.surname || null
  })
    .catch(console.log);

  // console.log(total, Math.ceil(total / itemsPerPage), total / itemsPerPage);
  return Promise.resolve(dispatch(setAuthorsLastPage(Math.ceil(total / itemsPerPage))))
    .then(() => getAuthors({
      page: currentPage,
      itemsPerPage,
      sortColumn: sortCol,
      sortDirection,
      filter
    })
      .then((res) => dispatch(setAuthorsData(res)))
      .catch((err) => console.log(err)));
};

export const sortAuthorRows = (col) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().admin.authors;
  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setSortAuthors(col, direction)))
    .then(() => dispatch(fetchAuthors()));
};

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
