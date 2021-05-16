import { combineReducers } from 'redux';
import subjectSearchReducer from './subjectSearchReducer';
import subjectReducer from './subjectReducer';
import subjectsReducer from './subjectsReducer';

const rootReducer = combineReducers({
  subject: subjectReducer,
  subjects: subjectsReducer,
  subjectSearch: subjectSearchReducer
});

export default rootReducer;
