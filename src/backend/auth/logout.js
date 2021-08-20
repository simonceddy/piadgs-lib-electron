const { logUserOut } = require('./boganAuthenticate');

const logout = () => Promise.resolve(logUserOut());

module.exports = logout;
