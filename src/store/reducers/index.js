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
import messageReducer from './messageReducer';
import worksToDbDataReducer from './worksToDbDataReducer';

const rootReducer = combineReducers({
  login: loginFormReducer,
  auth: authReducer,
  admin: adminReducer,
  app: appReducer,
  errors: errorsReducer,
  messages: messageReducer,
  titles,
  subjects,
  authors,
  search: librarySearchReducer,
  worksToDb: worksToDbDataReducer,
});

export default rootReducer;
