import {
  RESET_FORM_VALUES,
  SET_FORM_SUBMITTED,
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
  isSubmitted: false,
  results: []
};

export default function titlesSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FORM_SUBMITTED:
      return { ...state, isSubmitted: action.payload.isSubmitted };
    case SET_TITLE_SEARCH_RESULTS:
      console.log(action.payload.results);
      return { ...state, results: action.payload.results };
    case UPDATE_SEARCH_VALUES:
      return { values: { ...state.values, ...action.payload.values }, isSubmitted: false };
    case RESET_FORM_VALUES:
      return { ...defaultState };
    default:
      return state;
  }
}
