import { searchLibrary } from '../../../message-control/controllers';

export const UPDATE_SEARCH_VALUES = 'UPDATE_SEARCH_VALUES';
export const SET_FORM_SUBMITTED = 'SET_FORM_SUBMITTED';
export const RESET_FORM_VALUES = 'RESET_FORM_VALUES';

export const SET_TITLE_SEARCH_INPUT = 'SET_TITLE_SEARCH_INPUT';

export const SET_TITLE_SEARCH_RESULTS = 'SET_TITLE_SEARCH_RESULTS';

export const SET_TITLE_SEARCH_COLUMN = 'SET_TITLE_SEARCH_COLUMN';

export const updateSearchValues = (values = {}) => ({
  type: UPDATE_SEARCH_VALUES,
  payload: { values }
});

export const setFormSubmitted = (isSubmitted = true) => ({
  type: SET_FORM_SUBMITTED,
  payload: {
    isSubmitted
  }
});

export const resetFormValues = () => ({
  type: RESET_FORM_VALUES
});

export const setTitleSearchResults = (results) => ({
  type: SET_TITLE_SEARCH_RESULTS,
  payload: { results }
});

export const setTitleSearchInput = (input) => ({
  type: SET_TITLE_SEARCH_INPUT,
  payload: { input }
});

export const setTitleSearchColumn = (searchCol) => ({
  type: SET_TITLE_SEARCH_COLUMN,
  payload: { searchCol }
});

// eslint-disable-next-line no-unused-vars
export const submitTitleSearch = () => (dispatch, getState) => {
  const { input, searchCol } = getState().titles.search;
  const searchParams = searchCol === 'all' ? ({
    title: input,
    // author: input,
    // subject: input,
    // callNumber: input
  }) : ({ [searchCol]: input });
  searchLibrary(searchParams)
    .then(async (response) => {
      await dispatch(setTitleSearchResults(response.results));
      dispatch(setFormSubmitted(true));
    })
    .catch((err) => console.log(err));
};

export const resetSearch = () => (dispatch) => Promise.resolve(dispatch(resetFormValues()))
  .then(() => dispatch(setFormSubmitted(false)));
