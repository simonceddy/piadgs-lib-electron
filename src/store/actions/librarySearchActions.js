import handleClientError from '../../handleClientError';
import { searchLibrary } from '../../message-control/controllers';
import { flipDirection } from '../../util/sort';

export const UPDATE_LIBRARY_SEARCH_VALUES = 'UPDATE_LIBRARY_SEARCH_VALUES';
export const SET_LIBRARY_FORM_SUBMITTED = 'SET_LIBRARY_FORM_SUBMITTED';
export const RESET_LIBRARY_FORM_VALUES = 'RESET_LIBRARY_FORM_VALUES';

export const SET_LIBRARY_SEARCH_SORTING = 'SET_LIBRARY_SEARCH_SORTING';
export const SET_LIBRARY_SEARCH_ITEMS_PER_PAGE = 'SET_LIBRARY_SEARCH_ITEMS_PER_PAGE';
export const SET_LIBRARY_SEARCH_CURRENT_PAGE = 'SET_LIBRARY_SEARCH_CURRENT_PAGE';

export const SET_LIBRARY_SEARCH_TOTAL_RESULTS = 'SET_LIBRARY_SEARCH_TOTAL_RESULTS';

export const SET_LIBRARY_SEARCH_RESULTS = 'SET_LIBRARY_SEARCH_RESULTS';

export const setLibrarySearchTotalResults = (totalResults) => ({
  type: SET_LIBRARY_SEARCH_TOTAL_RESULTS,
  payload: { totalResults }
});

export const updateLibrarySearchValues = (values = {}) => ({
  type: UPDATE_LIBRARY_SEARCH_VALUES,
  payload: { values }
});

export const setLibrarySearchFormSubmitted = (isSubmitted = true) => ({
  type: SET_LIBRARY_FORM_SUBMITTED,
  payload: {
    isSubmitted
  }
});

export const setLibrarySearchSorting = (sortCol, sortDirection) => ({
  type: SET_LIBRARY_SEARCH_SORTING,
  payload: { sortCol, sortDirection }
});

export const setLibrarySearchItemsPerPage = (itemsPerPage) => ({
  type: SET_LIBRARY_SEARCH_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

export const setLibrarySearchCurrentPage = (currentPage) => ({
  type: SET_LIBRARY_SEARCH_CURRENT_PAGE,
  payload: { currentPage }
});

export const resetLibrarySearchFormValues = () => ({
  type: RESET_LIBRARY_FORM_VALUES
});

export const setLibrarySearchResults = (results) => ({
  type: SET_LIBRARY_SEARCH_RESULTS,
  payload: { results }
});

// eslint-disable-next-line no-unused-vars
export const submitLibrarySearchForm = () => (dispatch, getState) => {
  const {
    values,
    sortCol,
    sortDirection,
    currentPage,
    itemsPerPage
  } = getState().search;
  searchLibrary({
    ...values,
    sortCol,
    sortDirection,
    page: currentPage,
    itemsPerPage
  })
    .then(async (response) => {
      // console.log(response);
      await dispatch(setLibrarySearchTotalResults(response.totalResults));
      await dispatch(setLibrarySearchResults(response.results));
      dispatch(setLibrarySearchFormSubmitted(true));
    })
    .catch(handleClientError);
};
export const resetLibrarySearch = () => (dispatch) => Promise.resolve(
  dispatch(resetLibrarySearchFormValues())
)
  .then(() => dispatch(setLibrarySearchFormSubmitted(false)));

export const sortLibrarySearchResults = (col) => async (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().search;

  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;

  await Promise.resolve(dispatch(setLibrarySearchSorting(col, direction)))
    .then(() => dispatch(submitLibrarySearchForm()));
};

export const setResultsPage = (page) => (dispatch) => Promise
  .resolve(dispatch(setLibrarySearchCurrentPage(page)))
  .then(dispatch(submitLibrarySearchForm()));
