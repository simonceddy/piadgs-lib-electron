import { combineReducers } from 'redux';
import authorsReducer from './authorsReducer';
import subjectsReducer from './subjectsReducer';
// import pasteFromWorksReducer from './pasteFromWorksReducer';

const adminReducer = combineReducers({
  authors: authorsReducer,
  subjects: subjectsReducer,
  // pasteFromWorks: pasteFromWorksReducer
});

export default adminReducer;
