import { SET_AUTHORS_SEARCH_INPUT, SET_AUTHORS_SEARCH_RESULTS, SET_AUTHORS_SORT_AUTHORS } from '../../actions/authors';

const defaultState = {
  input: '',
  results: [],
  sortCol: 'surname',
  sortDirection: 'ASC'
};

export default function authorSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHORS_SORT_AUTHORS:
      return {
        ...state,
        sortCol: action.payload.col,
        sortDirection: action.payload.direction,
      };
    case SET_AUTHORS_SEARCH_INPUT:
      return { ...state, input: action.payload.input };
    case SET_AUTHORS_SEARCH_RESULTS:
      return { ...state, results: action.payload.results };
    default:
      return state;
  }
}
