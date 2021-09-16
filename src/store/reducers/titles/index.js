import { combineReducers } from 'redux';
import titlesReducer from './titlesReducer';
import titlesSearchReducer from './titlesSearchReducer';
import titleFormReducer from './titleFormReducer';

const rootReducer = combineReducers({
  titles: titlesReducer,
  search: titlesSearchReducer,
  title: titleFormReducer
});

export default rootReducer;
