import {
  SET_RESULTS
} from '../../actions';

const defaultState = {
  fetching: false,
  fetched: false,
  results: [],
  lastQuery: null
};

export default function resultsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RESULTS:
      return { ...state, results: action.payload.results };
    default:
      return state;
  }
}
