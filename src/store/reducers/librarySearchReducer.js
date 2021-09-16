import {
  SET_LIBRARY_SEARCH_CURRENT_PAGE,
  SET_LIBRARY_SEARCH_ITEMS_PER_PAGE,
  RESET_LIBRARY_FORM_VALUES,
  SET_LIBRARY_FORM_SUBMITTED,
  SET_LIBRARY_SEARCH_RESULTS,
  UPDATE_LIBRARY_SEARCH_VALUES,
  SET_LIBRARY_SEARCH_SORTING,
  SET_LIBRARY_SEARCH_TOTAL_RESULTS
} from '../actions';

const defaultState = {
  values: {
    author: '',
    title: '',
    subject: '',
    location: ''
  },
  isSubmitted: false,
  results: [],
  sortCol: 'title',
  sortDirection: 'ASC',
  currentPage: 1,
  itemsPerPage: 32,
  totalResults: null
};

export default function librarySearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LIBRARY_SEARCH_TOTAL_RESULTS:
      return { ...state, totalResults: action.payload.totalResults };
    case SET_LIBRARY_SEARCH_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload.itemsPerPage };
    case SET_LIBRARY_SEARCH_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_LIBRARY_SEARCH_SORTING:
      console.log(state);
      return {
        ...state,
        sortCol: action.payload.sortCol,
        sortDirection: action.payload.sortDirection,
      };
    case SET_LIBRARY_FORM_SUBMITTED:
      return { ...state, isSubmitted: action.payload.isSubmitted };
    case SET_LIBRARY_SEARCH_RESULTS:
      // console.log(action.payload.results);
      return { ...state, results: action.payload.results };
    case UPDATE_LIBRARY_SEARCH_VALUES:
      return {
        ...state,
        values: { ...state.values, ...action.payload.values },
        isSubmitted: false
      };
    case RESET_LIBRARY_FORM_VALUES:
      return { ...defaultState };
    default:
      return state;
  }
}
