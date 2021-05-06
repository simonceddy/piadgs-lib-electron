import axios from 'axios';

export const SET_SUBJECTS_DATA = 'SET_SUBJECTS_DATA';

export const setSubjectsData = (data) => ({
  type: SET_SUBJECTS_DATA,
  payload: { data }
});

export const fetchSubjects = () => (dispatch) => axios.get('/subjects')
  .then((res) => dispatch(setSubjectsData(res.data)))
  .catch((err) => console.log(err));
