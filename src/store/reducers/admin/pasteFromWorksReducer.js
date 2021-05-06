import updateByIndex from '../../../util/updateByIndex';
import {
  CLEAR_PROCESSED,
  REMOVE_PROCESSED_BY_ID,
  SET_CURRENT_TEXT,
  SET_IS_PROCESSED,
  SET_PROCESSED_RESULTS,
  SET_SHOW_ONLY_ISSUES,
  UPDATE_PROCESSED_BY_ID
} from '../../actions';

const defaultState = {
  currentText: '',
  processedResults: [],
  showOnlyIssues: false,
  isProcessed: false,
  isStored: false,
};

export default function pasteFromWorksReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_TEXT:
      return { ...state, currentText: action.payload.currentText };
    case SET_SHOW_ONLY_ISSUES:
      return { ...state, showOnlyIssues: !state.showOnlyIssues };
    case CLEAR_PROCESSED:
      return { ...state, processedResults: [], isProcessed: false };
    case SET_IS_PROCESSED:
      return { ...state, isProcessed: action.payload.isProcessed };
    case REMOVE_PROCESSED_BY_ID:
      return {
        ...state,
        processedResults: state.processedResults.filter(
          (val, id) => id !== action.payload.id
        )
      };
    case UPDATE_PROCESSED_BY_ID:
      return {
        ...state,
        processedResults: updateByIndex(
          state.processedResults,
          action.payload.id,
          action.payload.data
        )
      };
    case SET_PROCESSED_RESULTS:
      return { ...state, processedResults: action.payload.results };
    default:
      return state;
  }
}
