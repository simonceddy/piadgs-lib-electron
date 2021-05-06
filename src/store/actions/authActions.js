import { keys } from '../../util/storage';

export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';
export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
export const USER_IS_LOGGED_IN = 'USER_IS_LOGGED_IN';

export const setLoggedInUser = (user) => ({
  type: SET_LOGGED_IN_USER,
  payload: { user }
});

export const setLoggedOut = () => ({
  type: SET_LOGGED_OUT,
  payload: { loggedIn: false }
});

export const userIsLoggedIn = () => {
};

export const logOutUser = () => (dispatch) => Promise.resolve(localStorage.removeItem(keys.token))
  .then(() => dispatch(setLoggedOut()));
