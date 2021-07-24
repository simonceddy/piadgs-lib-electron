// Incredibly sophisticated authentication for testing logged in states
const { store, actions } = require('../store');

module.exports = {
  isLoggedIn: () => store.getState().loggedIn,
  logUserIn: ({ username }) => {
    if (username) store.dispatch(actions.setUserLoggedIn(true));
  },
  logUserOut: () => store.dispatch(actions.setUserLoggedIn(false)),
};
