import {
  CLEAR_MESSAGE,
  SET_AUTHOR_MESSAGE,
  SET_SUBJECT_MESSAGE
} from '../actions';

const defaultState = {
  message: false,
  authors: null,
  subjects: null,
  titles: null
};

export default function messageReducer(state = defaultState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE:
      return { ...state, [action.payload.type]: null };
    case 'ADD_MESSAGE':
      return { ...state, [action.payload.type]: action.payload.message };
    // TODO tidy
    case SET_AUTHOR_MESSAGE:
      return {
        ...state,
        authors: action.payload.message
      };
    case SET_SUBJECT_MESSAGE:
      return {
        ...state,
        subjects: action.payload.message
      };
    // TODO
    case 'SET_TITLE_MESSAGE':
      return {
        ...state,
        titles: action.payload.message
      };
    default:
      return state;
  }
}
