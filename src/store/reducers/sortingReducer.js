import { SET_SORTING_FOR } from '../actions';

const sortApplet = (applet, sortCol, sortDirection = 'ASC') => ({
  [applet]: {
    sortCol,
    sortDirection
  }
});

const defaultState = {
  applets: {
    ...sortApplet('search', 'title'),
    ...sortApplet('titles', 'title'),
    ...sortApplet('subjects', 'name'),
    ...sortApplet('authors', 'surname'),
  },
};

export default function sortingReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SORTING_FOR:
      return {
        ...state,
        applets: {
          ...state.applets,
          ...sortApplet(
            action.payload.applet,
            action.payload.sortCol,
            action.payload.sortDirection
          ),
        }
      };
    default:
      return state;
  }
}
