import axios from 'axios';

export const SET_AUTHORS_DATA = 'SET_AUTHORS_DATA';
export const SET_AUTHORS_FETCHED = 'SET_AUTHORS_FETCHED';

export const setAuthorsData = (data) => ({
  type: SET_AUTHORS_DATA,
  payload: { data }
});

export const fetchAuthors = () => (dispatch) => axios.get('/authors')
  .then((res) => dispatch(setAuthorsData(res.data)))
  .catch((err) => console.log(err));
