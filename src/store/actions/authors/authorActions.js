import axios from 'axios';

export const SET_SELECTED_TITLES = 'SET_SELECTED_TITLES';
export const SET_AUTHOR_DATA = 'SET_AUTHOR_DATA';

export const setSelectedTitles = (selectedTitles = []) => ({
  type: SET_SELECTED_TITLES,
  payload: { selectedTitles }
});

export const setAuthorData = (data) => ({
  type: SET_AUTHOR_DATA,
  payload: { data }
});

export const updateAuthor = (data, onFail = () => null) => (dispatch) => {
  console.log(data);
  return axios.post('/authors/update', data)
    .then((res) => {
      if (!res.data.data) {
        console.log(res.data);
        return dispatch(onFail());
      }
      return dispatch(setAuthorData(data));
    })
    .catch((err) => console.log(err));
};
