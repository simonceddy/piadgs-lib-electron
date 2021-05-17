import { combineReducers } from 'redux';
import authorMessageReducer from './authorMessageReducer';
import authorReducer from './authorReducer';
import authorSearchReducer from './authorSearchReducer';
import authorFormReducer from './authorFormReducer';

const rootReducer = combineReducers({
  author: authorReducer,
  authorSearch: authorSearchReducer,
  messages: authorMessageReducer,
  authorForm: authorFormReducer
});

export default rootReducer;
