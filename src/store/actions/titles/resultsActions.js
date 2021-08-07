import axios from 'axios';

// TODO Is this file still required?
export const SET_FETCHING_RESULTS = 'SET_FETCHING_RESULTS';
export const SET_RESULTS_FETCHED = 'SET_RESULTS_FETCHED';
export const SET_RESULTS = 'SET_RESULTS';
export const SET_LAST_QUERY = 'SET_LAST_QUERY';

export const setFetchingResults = () => ({
  type: SET_FETCHING_RESULTS
});

export const setResultsFetched = () => ({
  type: SET_RESULTS_FETCHED
});

export const setResults = (results = []) => ({
  type: SET_RESULTS,
  payload: { results }
});

export const setLastQuery = (query) => ({
  type: SET_LAST_QUERY,
  payload: { query }
});

export const fetchResults = (query) => async (dispatch) => Promise.resolve(
  dispatch(setFetchingResults())
)
  .then(() => axios.get(`/search?${query}`))
  .then((res) => Promise.resolve(dispatch(setResults(res.data.results))))
  .then(() => Promise.resolve(dispatch(setLastQuery(query))))
  .then(() => dispatch(setResultsFetched()))
  .catch((err) => console.log(err));
