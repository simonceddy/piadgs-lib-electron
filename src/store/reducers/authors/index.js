import { combineReducers } from 'redux';
import authorReducer from './authorReducer';
import authorSearchReducer from './authorSearchReducer';
import authorFormReducer from './authorFormReducer';

const rootReducer = combineReducers({
  author: authorReducer,
  authorSearch: authorSearchReducer,
  authorForm: authorFormReducer
});

export default rootReducer;
