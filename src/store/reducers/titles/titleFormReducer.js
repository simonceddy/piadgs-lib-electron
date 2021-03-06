import {
  ADD_AUTHOR_TO_TITLE,
  ADD_SUBJECT_TO_TITLE,
  CLEAR_TITLE_FORM_VALUES,
  REMOVE_AUTHOR_FROM_TITLE,
  REMOVE_SUBJECT_FROM_TITLE,
  RESET_TITLE_FORM,
  SET_EDITING_TITLE,
  SET_TITLE_FORM_SUBMITTED,
  SET_TITLE_FORM_VALUES
} from '../../actions';

const defaultState = {
  values: {},
  authors: [],
  subjects: [],
  isSubmitted: false,
  isNew: false,
  isEditing: false
};

export default function titleFormReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_EDITING_TITLE:
      return { ...state, isEditing: action.payload.isEditing };
    case CLEAR_TITLE_FORM_VALUES:
      return { ...state, values: defaultState.values };
    case RESET_TITLE_FORM:
      console.log('clearing form data');
      return { ...defaultState };
    case SET_TITLE_FORM_VALUES:
      return {
        ...state,
        values: { ...state.values, ...action.payload.values }
      };
    case SET_TITLE_FORM_SUBMITTED:
      return { ...state, isSubmitted: true };
    case ADD_AUTHOR_TO_TITLE:
      return {
        ...state,
        authors: [...state.authors, action.payload.author],
        values: { ...state.values, authors: '' }
      };
    case REMOVE_AUTHOR_FROM_TITLE:
      return {
        ...state,
        authors: state.authors.filter((author, index) => index !== action.payload.id)
      };
    case ADD_SUBJECT_TO_TITLE:
      return {
        ...state,
        subjects: [...state.subjects, action.payload.subject],
        values: { ...state.values, subjects: '' }
      };
    case REMOVE_SUBJECT_FROM_TITLE:
      return {
        ...state,
        subjects: state.subjects.filter((subject, index) => index !== action.payload.id)
      };
    default:
      return state;
  }
}
