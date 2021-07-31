import { SET_AUTHOR_DATA, SET_SELECTED_TITLES } from '../../actions';

const defaultState = {
  data: {
    surname: '',
    given_names: '',
    created_at: '',
    updated_at: '',
    titles: [],
    id: ''
  },
  selectedTitles: {}
};

export default function editAuthorReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SELECTED_TITLES:
      return { ...state, selectedTitles: action.payload.selectedTitles };
    case SET_AUTHOR_DATA:
      // console.log(action.payload);
      return { ...state, data: { ...state.data, ...action.payload.data } };
    default:
      return state;
  }
}
