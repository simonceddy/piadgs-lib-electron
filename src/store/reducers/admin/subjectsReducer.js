import { SET_SUBJECTS_DATA } from '../../actions';

const defaultState = {
  data: [],
  fetched: false,
};

export default function subjectsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SUBJECTS_DATA:
      return { ...state, fetched: true, data: action.payload.data };
    default:
      return state;
  }
}
