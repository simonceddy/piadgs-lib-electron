import { combineReducers } from 'redux';
import authorMessageReducer from './authorMessageReducer';
import authorReducer from './authorReducer';
import authorSearchReducer from './authorSearchReducer';

const rootReducer = combineReducers({
  author: authorReducer,
  authorSearch: authorSearchReducer,
  messages: authorMessageReducer
});

export default rootReducer;
