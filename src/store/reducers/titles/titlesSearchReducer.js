import {
  RESET_FORM_VALUES,
  SET_FORM_SUBMITTED,
  SET_TITLE_SEARCH_COLUMN,
  SET_TITLE_SEARCH_INPUT,
  SET_TITLE_SEARCH_RESULTS,
  UPDATE_SEARCH_VALUES
} from '../../actions';

const defaultState = {
  values: {
    author: '',
    title: '',
    subject: '',
    callNumber: ''
  },
  input: '',
  isSubmitted: false,
  results: [],
  searchCol: 'all'
};

export default function titlesSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TITLE_SEARCH_COLUMN:
      return { ...state, searchCol: action.payload.searchCol };
    case SET_FORM_SUBMITTED:
      return { ...state, isSubmitted: action.payload.isSubmitted };
    case SET_TITLE_SEARCH_RESULTS:
      console.log(action.payload.results);
      return { ...state, results: action.payload.results };
    case UPDATE_SEARCH_VALUES:
      return { values: { ...state.values, ...action.payload.values }, isSubmitted: false };
    case SET_TITLE_SEARCH_INPUT:
      return { ...state, input: action.payload.input };
    case RESET_FORM_VALUES:
      return { ...defaultState };
    default:
      return state;
  }
}
