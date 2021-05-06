import {
  RESET_LOGIN_FORM,
  SET_LOGGING_IN,
  SET_LOGIN_ERRORS,
  SET_PASSWORD_VALUE,
  SET_USERNAME_VALUE
} from '../actions';

// TODO how best to store form vals - Use class or hooks vs redux?
const defaultState = {
  username: '',
  password: '',
  loggingIn: false,
  errors: []
};

export default function loginFormReducer(state = defaultState, action) {
  switch (action.type) {
    case RESET_LOGIN_FORM:
      return defaultState;
    case SET_LOGIN_ERRORS:
      return { ...state, errors: action.payload.errors };
    case SET_USERNAME_VALUE:
      return { ...state, username: action.payload.username };
    case SET_PASSWORD_VALUE:
      return { ...state, password: action.payload.password };
    case SET_LOGGING_IN:
      return { ...state, loggingIn: action.payload.loggingIn };
    default:
      return state;
  }
}
