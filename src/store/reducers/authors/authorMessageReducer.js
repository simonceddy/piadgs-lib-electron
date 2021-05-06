import { SET_AUTHOR_MESSAGE } from '../../actions/authors';

const defaultState = {
  message: false
};

export default function authorMessageReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHOR_MESSAGE:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
}
