import {
  SET_SORT_SUBJECTS,
  SET_SUBJECTS_CURRENT_PAGE,
  SET_SUBJECTS_DATA,
  SET_SUBJECTS_ITEMS_PER_PAGE,
  SET_SUBJECTS_LAST_PAGE
} from '../../actions/subjects';

const defaultState = {
  data: [],
  fetched: false,
  sortCol: 'name',
  sortDirection: 'ASC',
  currentPage: 1,
  itemsPerPage: 32,
  lastPage: null
};

export default function subjectsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SUBJECTS_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload.itemsPerPage };
    case SET_SUBJECTS_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_SUBJECTS_LAST_PAGE:
      return { ...state, lastPage: action.payload.lastPage };
    case SET_SORT_SUBJECTS:
      return {
        ...state,
        sortCol: action.payload.sortCol,
        sortDirection: action.payload.sortDirection,
      };
    case SET_SUBJECTS_DATA:
      return { ...state, fetched: true, data: action.payload.data };
    default:
      return state;
  }
}
