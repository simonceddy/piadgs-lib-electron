import {
  SET_AUTHORS_SEARCH_INPUT,
  SET_AUTHORS_SEARCH_RESULTS,
  SET_AUTHORS_SORT_AUTHORS
} from '../../actions';

const defaultState = {
  input: '',
  results: [],
  sortCol: 'name',
  sortDirection: 'ASC'
};

export default function authorSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHORS_SORT_AUTHORS:
      return {
        ...state,
        sortCol: action.payload.sortCol,
        sortDirection: action.payload.sortDirection,
      };
    case SET_AUTHORS_SEARCH_INPUT:
      console.log(action);
      return { ...state, input: action.payload.input };
    case SET_AUTHORS_SEARCH_RESULTS:
      return { ...state, results: action.payload.results };
    default:
      return state;
  }
}
