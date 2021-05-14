import {
  RESET_LIBRARY_FORM_VALUES,
  SET_LIBRARY_FORM_SUBMITTED,
  SET_LIBRARY_SEARCH_RESULTS,
  UPDATE_LIBRARY_SEARCH_VALUES
} from '../actions';

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

export default function librarySearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LIBRARY_FORM_SUBMITTED:
      return { ...state, isSubmitted: action.payload.isSubmitted };
    case SET_LIBRARY_SEARCH_RESULTS:
      // console.log(action.payload.results);
      return { ...state, results: action.payload.results };
    case UPDATE_LIBRARY_SEARCH_VALUES:
      return { values: { ...state.values, ...action.payload.values }, isSubmitted: false };
    case RESET_LIBRARY_FORM_VALUES:
      return { ...defaultState };
    default:
      return state;
  }
}
