import { SET_SORT_SUBJECTS, SET_SUBJECTS_DATA } from '../../actions/subjects';

const defaultState = {
  data: [],
  fetched: false,
  sortCol: 'name',
  sortDirection: 'ASC',
  currentPage: 1,
  itemsPerPage: 32
};

export default function subjectsReducer(state = defaultState, action) {
  switch (action.type) {
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
