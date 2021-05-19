import {
  SET_SUBJECT_FORM_INPUT,
  SET_SUBJECT_FORM_TILES,
} from '../../actions';

const defaultState = {
  input: {
    name: '',
  },
  titles: [],
};

export default function subjectFormReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SUBJECT_FORM_INPUT:
      return { ...state, saved: false, input: action.payload.input };
    case SET_SUBJECT_FORM_TILES:
      return { ...state, titles: action.payload.titles };
    default:
      return state;
  }
}
