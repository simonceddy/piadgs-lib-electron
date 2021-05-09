import {
  SET_CURRENT_PAGE,
  SET_ITEMS_PER_PAGE,
  SET_LAST_PAGE,
  SET_TITLES_DATA,
  SET_TITLES_SORT
} from '../../actions';

const defaultState = {
  titles: [],
  pages: {}, // TODO
  sortColumn: 'title',
  sortDirection: 'ASC',
  lastPage: null,
  currentPage: 1,
  itemsPerPage: 40
};

export default function titlesReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ITEMS_PER_PAGE:
      console.log('setting items per page');
      return { ...state, itemsPerPage: action.payload.itemsPerPage };
    case SET_LAST_PAGE:
      return { ...state, lastPage: action.payload.lastPage };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_TITLES_SORT:
      // console.log(action.payload);
      return {
        ...state,
        sortColumn: action.payload.sortColumn,
        sortDirection: action.payload.sortDirection
      };
    case SET_TITLES_DATA:
      return { ...state, titles: action.payload.titles };
    default:
      return state;
  }
}
