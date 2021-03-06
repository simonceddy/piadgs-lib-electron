import { SET_AUTHOR_FORM_INPUT, SET_AUTHOR_FORM_TILES } from '../../actions';

const defaultState = {
  input: {
    name: ''
  },
  titles: []
};

export default function authorFormReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTHOR_FORM_INPUT:
      return { ...state, input: action.payload.input };
    case SET_AUTHOR_FORM_TILES:
      return { ...state, titles: action.payload.titles };
    default:
      return state;
  }
}
