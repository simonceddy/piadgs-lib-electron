// import axios from 'axios';
import { attemptLogin } from '../../message-control/controllers';

// const login = ({ username, password }) => axios.post(
//   '/auth/login', { username, password }
// );

const login = ({ username, password }) => attemptLogin({ username, password })
  .then((result) => result)
  .catch((err) => console.log(err));

export default login;
