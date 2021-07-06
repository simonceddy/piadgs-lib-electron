// Incredibly sophisticated authentication for testing logged in states
let userLoggedIn = false;

module.exports = {
  isLoggedIn: () => userLoggedIn,
  logUserIn: ({ username }) => {
    if (username) userLoggedIn = true;
    console.log(userLoggedIn);
  },
  logUserOut: () => {
    userLoggedIn = false;
    console.log(userLoggedIn);
  },
};
