import { combineReducers } from 'redux';
import subjectSearchReducer from './subjectSearchReducer';
import subjectReducer from './subjectReducer';
import subjectsReducer from './subjectsReducer';
import subjectFormReducer from './subjectFormReducer';

const rootReducer = combineReducers({
  subject: subjectReducer,
  subjects: subjectsReducer,
  subjectSearch: subjectSearchReducer,
  subjectForm: subjectFormReducer,
});

export default rootReducer;
