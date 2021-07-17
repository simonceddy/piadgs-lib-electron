import {
  CLEAR_TITLES,
  PROCESSED_TITLE_SAVED,
  SET_CONVERTED_TITLES,
  SET_UNCONVERTED_TEXT_INPUT
} from '../actions';

const defaultState = {
  input: '',
  titles: [],
  showOnlyIssues: false,
  isProcessed: false,
  isStored: false,
  saved: []
};

export default function worksToDbDataReducer(state = defaultState, action) {
  switch (action.type) {
    case PROCESSED_TITLE_SAVED:
      return {
        ...state,
        saved: [...state.saved, action.payload.id]
      };
    case SET_UNCONVERTED_TEXT_INPUT:
      return { ...state, input: action.payload.input };
    case SET_CONVERTED_TITLES:
      return { ...state, titles: action.payload.titles };
    case CLEAR_TITLES:
      return { ...state, titles: [], saved: [] };
    default:
      return state;
  }
}
