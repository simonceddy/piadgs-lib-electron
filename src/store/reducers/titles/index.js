import { combineReducers } from 'redux';
import titlesReducer from './titlesReducer';
import titlesSearchReducer from './titlesSearchReducer';
import resultsReducer from './resultsReducer';
import titleFormReducer from './titleFormReducer';

const rootReducer = combineReducers({
  titles: titlesReducer,
  search: titlesSearchReducer,
  results: resultsReducer,
  title: titleFormReducer
});

export default rootReducer;
