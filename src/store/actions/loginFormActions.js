// import jwtDecode from 'jwt-decode';
import { setLoggedInUser, setLoggedOut } from './authActions';
import login from '../../util/auth/login';
import handleClientError from '../../handleClientError';
// import setAuthToken from '../../util/auth/setAuthToken';
// import { keys } from '../../util/storage';

export const SET_USERNAME_VALUE = 'SET_USERNAME_VALUE';
export const SET_PASSWORD_VALUE = 'SET_PASSWORD_VALUE';
export const SET_LOGGING_IN = 'SET_LOGGING_IN';
export const SET_LOGIN_ERRORS = 'SET_LOGIN_ERRORS';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';
export const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM';

export const setUsernameValue = (username) => ({
  type: SET_USERNAME_VALUE,
  payload: { username }
});

export const setPasswordValue = (password) => ({
  type: SET_PASSWORD_VALUE,
  payload: { password }
});

export const setLoggingIn = (loggingIn) => ({
  type: SET_LOGGING_IN,
  payload: { loggingIn }
});

export const setLoginErrors = (errors) => ({
  type: SET_LOGIN_ERRORS,
  payload: { errors }
});

export const resetLoginForm = () => ({
  type: RESET_LOGIN_FORM
});

export const attemptLogin = ({ username, password }) => (dispatch) => Promise
  .resolve(dispatch(setLoggingIn(true)))
  .then(() => login({
    username, password
  })
    .then((res) => {
      // console.log('here', res);

      if (res.success) {
        // Set token to ls
        // localStorage.setItem(keys.token, res.data.token);
        // Set token to Auth header
        // setAuthToken(res.data.token);
        // const decoded = jwtDecode(res.data.token);
        return Promise.resolve(
          dispatch(setLoggedInUser({ username: res.user.username }))
        )
          .then(() => dispatch(setLoginErrors([])));
      }

      return Promise.resolve(dispatch(setLoggedOut(false)))
        .then(() => dispatch(setLoginErrors([
          'Incorrect username or password'
        ])));
    }))
  .catch(() => Promise.resolve(dispatch(setLoggedOut(false)))
    .then(dispatch(setLoginErrors([
      'Incorrect username or password'
    ]))))
  .then(() => dispatch(setLoggingIn(false)))
  .catch(handleClientError);
