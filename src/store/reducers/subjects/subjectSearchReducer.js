import {
  SET_SUBJECT_SEARCH_INPUT,
  SET_SUBJECT_SEARCH_RESULTS,
  SET_SUBJECT_SORT_RESULTS
} from '../../actions/subjects';

const defaultState = {
  input: '',
  results: [],
  sortKey: 'name',
  sortDirection: 'ASC'
};

export default function subjectSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SUBJECT_SORT_RESULTS:
      return {
        ...state,
        sortDirection: action.payload.sortDirection,
        sortKey: action.payload.sortKey
      };
    case SET_SUBJECT_SEARCH_INPUT:
      return { ...state, input: action.payload.input };
    case SET_SUBJECT_SEARCH_RESULTS:
      return { ...state, results: action.payload.results };
    default:
      return state;
  }
}
