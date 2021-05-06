import axios from 'axios';

const login = ({ username, password }) => axios.post(
  '/auth/login', { username, password }
);

export default login;
