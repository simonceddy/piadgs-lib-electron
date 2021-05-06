import {
  ADD_ERROR_MESSAGE,
  CLEAR_MESSAGE_BY_ID,
  TOGGLE_ERRORS_MODAL
} from '../actions';

const defaultState = {
  errors: [],
  showModal: false
};

export default function errorsReducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_ERRORS_MODAL:
      return { ...state, showModal: !state.showModal };
    case ADD_ERROR_MESSAGE:
      return { ...state, errors: [...state.errors, action.payload.message] };
    case CLEAR_MESSAGE_BY_ID:
      return {
        ...state,
        errors: state.errors.filter(
          (val, id) => id !== action.payload.id
        )
      };
    default:
      return state;
  }
}
