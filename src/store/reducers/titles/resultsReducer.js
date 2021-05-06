import {
  SET_FETCHING_RESULTS,
  SET_LAST_QUERY,
  SET_RESULTS,
  SET_RESULTS_FETCHED
} from '../../actions';

const defaultState = {
  fetching: false,
  fetched: false,
  results: [],
  lastQuery: null
};

export default function resultsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FETCHING_RESULTS:
      return { ...state, fetching: true, fetched: false };
    case SET_RESULTS_FETCHED:
      return { ...state, fetching: false, fetched: true };
    case SET_RESULTS:
      return { ...state, results: action.payload.results };
    case SET_LAST_QUERY:
      return { ...state, lastQuery: action.payload.query };
    default:
      return state;
  }
}
