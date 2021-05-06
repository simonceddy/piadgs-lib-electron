import axios from 'axios';
import makeSearchQuery from '../../../util/makeSearchQuery';

export const UPDATE_SEARCH_VALUES = 'UPDATE_SEARCH_VALUES';
export const SET_FORM_SUBMITTED = 'SET_FORM_SUBMITTED';
export const RESET_FORM_VALUES = 'RESET_FORM_VALUES';

export const SET_TITLE_SEARCH_RESULTS = 'SET_TITLE_SEARCH_RESULTS';

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

export const setSearchResults = (results) => ({
  type: SET_TITLE_SEARCH_RESULTS,
  payload: { results }
});

export const performSearch = (query) => (dispatch) => Promise.resolve(
  axios.get(`/search?${query}`)
    .then((response) => dispatch(setSearchResults(response.data.results)))
    .catch((err) => console.log(err))
);

// eslint-disable-next-line no-unused-vars
export const submitSearchForm = (data = {}, callback) => {
  // TODO handle empty values
  const query = makeSearchQuery(data).toString();

  if (Object.keys(data).filter((key) => data[key].length > 0).length < 1) {
    console.log('no params!');
    return (dispatch) => dispatch(setFormSubmitted(false));
  }
  // TODO Set results and display them
  return (dispatch) => Promise.resolve(dispatch(setFormSubmitted(true)))
    .then(() => callback(query));
};

export const resetSearch = () => (dispatch) => Promise.resolve(dispatch(resetFormValues()))
  .then(() => dispatch(setFormSubmitted(false)));
