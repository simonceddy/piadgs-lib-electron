import { SET_AUTHOR_DATA, SET_SELECTED_TITLES } from '../../actions/authors';

const defaultState = {
  data: {
    surname: '',
    givenNames: '',
    createdAt: '',
    updatedAt: '',
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
      return { ...state, data: { ...state.data, ...action.payload.data } };
    default:
      return state;
  }
}
