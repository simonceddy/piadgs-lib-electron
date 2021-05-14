import { searchLibrary } from '../../message-control/controllers';

export const UPDATE_LIBRARY_SEARCH_VALUES = 'UPDATE_LIBRARY_SEARCH_VALUES';
export const SET_LIBRARY_FORM_SUBMITTED = 'SET_LIBRARY_FORM_SUBMITTED';
export const RESET_LIBRARY_FORM_VALUES = 'RESET_LIBRARY_FORM_VALUES';

export const SET_LIBRARY_SEARCH_RESULTS = 'SET_LIBRARY_SEARCH_RESULTS';

export const updateLibrarySearchValues = (values = {}) => ({
  type: UPDATE_LIBRARY_SEARCH_VALUES,
  payload: { values }
});

export const setLibraryFormSubmitted = (isSubmitted = true) => ({
  type: SET_LIBRARY_FORM_SUBMITTED,
  payload: {
    isSubmitted
  }
});

export const resetLibraryFormValues = () => ({
  type: RESET_LIBRARY_FORM_VALUES
});

export const setLibrarySearchResults = (results) => ({
  type: SET_LIBRARY_SEARCH_RESULTS,
  payload: { results }
});

// eslint-disable-next-line no-unused-vars
export const submitLibrarySearchForm = (params = {}) => (dispatch) => searchLibrary(params)
  .then(async (response) => {
    await dispatch(setLibrarySearchResults(response.results));
    dispatch(setLibraryFormSubmitted(true));
  })
  .catch((err) => console.log(err));

export const resetLibrarySearch = () => (dispatch) => Promise.resolve(
  dispatch(resetLibraryFormValues())
)
  .then(() => dispatch(setLibraryFormSubmitted(false)));
