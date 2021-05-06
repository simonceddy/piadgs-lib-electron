import { SET_AUTHORS_DATA } from '../../actions';

const defaultState = {
  data: [],
  fetched: false
};

export default function authorsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHORS_DATA:
      return { ...state, fetched: true, data: action.payload.data };
    default:
      return state;
  }
}
