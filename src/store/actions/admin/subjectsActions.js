import { getSubjects } from '../../../message-control/controllers';

export const SET_SUBJECTS_DATA = 'SET_SUBJECTS_DATA';

export const setSubjectsData = (data) => ({
  type: SET_SUBJECTS_DATA,
  payload: { data }
});

export const fetchSubjects = () => (dispatch) => getSubjects()
  .then((res) => dispatch(setSubjectsData(res)))
  .catch((err) => console.log(err));
