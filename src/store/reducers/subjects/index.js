import { combineReducers } from 'redux';
import subjectSearchReducer from './subjectSearchReducer';
import subjectsReducer from './subjectsReducer';

const rootReducer = combineReducers({
  subject: subjectsReducer,
  subjectSearch: subjectSearchReducer
});

export default rootReducer;
