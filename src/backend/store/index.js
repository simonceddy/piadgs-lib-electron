const { applyMiddleware, createStore } = require('redux');
const thunk = require('redux-thunk').default;

const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';

const actions = {
  setUserLoggedIn: (loggedIn = false) => ({
    type: SET_USER_LOGGED_IN,
    payload: { loggedIn }
  }),
};

const defaultState = {
  loggedIn: true
};

function backendReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return { ...state, loggedIn: action.payload.loggedIn };
    default:
      return state;
  }
}

const store = createStore(backendReducer, applyMiddleware(thunk));

module.exports = { store, actions };
