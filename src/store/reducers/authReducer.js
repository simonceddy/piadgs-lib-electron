import { SET_LOGGED_IN_USER, SET_LOGGED_OUT } from '../actions';

const defaultState = {
  loggedIn: false,
  user: null
};

const loggedInState = {
  loggedIn: true,
  user: {
    username: 'simon'
  }
};

export default function authReducer(state = loggedInState, action) {
  switch (action.type) {
    case SET_LOGGED_OUT:
      return defaultState;
    case SET_LOGGED_IN_USER:
      console.log(action.payload);
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    default:
      return state;
  }
}
