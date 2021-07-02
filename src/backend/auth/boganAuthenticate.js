let userLoggedIn = false;

module.exports = {
  isLoggedIn: () => {
    console.log(userLoggedIn);
    return userLoggedIn;
  },
  logUserIn: ({ username }) => {
    if (username) userLoggedIn = true;
    console.log(userLoggedIn);
  },
  logUserOut: () => {
    userLoggedIn = false;
    console.log(userLoggedIn);
  },
};
