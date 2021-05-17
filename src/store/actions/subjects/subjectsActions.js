import { getSubjects } from '../../../message-control/controllers';
import { flipDirection, sortSubjects } from '../../../util/sort';
// import { flipDirection, sortPropAZ, sortPropLength } from '../../../util/sort';

export const SET_SUBJECTS_DATA = 'SET_SUBJECTS_DATA';
export const SET_SORT_SUBJECTS = 'SET_SORT_SUBJECTS';

export const setSubjectsData = (data) => ({
  type: SET_SUBJECTS_DATA,
  payload: { data }
});

export const setSortSubjects = (sortCol, sortDirection) => ({
  type: SET_SORT_SUBJECTS,
  payload: { sortCol, sortDirection }
});
/*
const setAndSortData = (data, col) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().subjects.subjects;

  const direction = sortCol === col ? flipDirection(sortDirection) : sortDirection;

  return Promise.resolve(dispatch(setSubjectSortResults(
    col,
    direction
  )))
    .then(() => {
      const sorted = col === 'titles'
        ? sortPropLength(data, 'titles')
        : sortPropAZ(data, 'name');

      return dispatch(setSubjectSearchResults(
        direction === 'DESC'
          ? sorted.reverse()
          : sorted
      ));
    })
    .catch((err) => console.log(err));

  // Sort data
}; */

export const sortAndSetSubjects = (data) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().subjects.subjects;

  const sorted = sortSubjects(data, sortCol);

  return dispatch(setSubjectsData(
    sortDirection === 'ASC' ? sorted : sorted.reverse(),
  ));
};

export const fetchSubjects = () => (dispatch) => {
  console.log('fetching subjects');
  return getSubjects()
    .then((res) => dispatch(sortAndSetSubjects(res)))
    .catch((err) => console.log(err));
};

export const sortSubjectRows = (col) => (dispatch, getState) => {
  const { sortCol, sortDirection, data = [] } = getState().subjects.subjects;
  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setSortSubjects(col, direction)))
    .then(() => dispatch(sortAndSetSubjects(data)));
};
