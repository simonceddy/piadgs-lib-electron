import { managerDefaultState } from '../../../shared/store';
import {
  SET_AUTHORS_CURRENT_PAGE,
  SET_AUTHORS_DATA,
  SET_AUTHORS_FILTER,
  SET_AUTHORS_ITEMS_PER_PAGE,
  SET_AUTHORS_LAST_PAGE,
  SET_FILTERING_AUTHORS,
  SET_SORT_AUTHORS
} from '../../actions';

const defaultState = {
  ...managerDefaultState,
  sortCol: 'name',
  sortDirection: 'ASC'
};

export default function authorsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHORS_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload.itemsPerPage };
    case SET_AUTHORS_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case SET_AUTHORS_LAST_PAGE:
      return { ...state, lastPage: action.payload.lastPage };
    case SET_SORT_AUTHORS:
      return {
        ...state,
        sortCol: action.payload.sortCol,
        sortDirection: action.payload.sortDirection,
      };
    case SET_AUTHORS_DATA:
      return { ...state, fetched: true, data: action.payload.data };
    case SET_AUTHORS_FILTER:
      return { ...state, filter: action.payload.filter };
    case SET_FILTERING_AUTHORS:
      return { ...state, filtering: action.payload.filtering };
    default:
      return state;
  }
}
