import { keys } from '../../util/storage';
import { SET_THEME_MODE } from '../actions';

const defaultState = {
  theme: localStorage.getItem(keys.theme) || 'defaultLight'
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_THEME_MODE:
      localStorage.setItem(keys.theme, action.payload.mode);
      return { ...state, theme: action.payload.mode };
    default:
      return state;
  }
}
