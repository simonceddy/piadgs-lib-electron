import { combineReducers } from 'redux';
import titlesReducer from './titlesReducer';
import titlesSearchReducer from './titlesSearchReducer';
import resultsReducer from './resultsReducer';

const rootReducer = combineReducers({
  titles: titlesReducer,
  search: titlesSearchReducer,
  results: resultsReducer
});

export default rootReducer;
