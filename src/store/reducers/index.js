import { combineReducers } from 'redux';
import titles from './titles';
import loginFormReducer from './loginFormReducer';
import authReducer from './authReducer';
import adminReducer from './admin';
import appReducer from './appReducer';
import errorsReducer from './errorsReducer';
import subjects from './subjects';
import authors from './authors';
import librarySearchReducer from './librarySearchReducer';

const rootReducer = combineReducers({
  login: loginFormReducer,
  auth: authReducer,
  admin: adminReducer,
  app: appReducer,
  errors: errorsReducer,
  titles,
  subjects,
  authors,
  search: librarySearchReducer
});

export default rootReducer;
