import { getSubjects } from '../../../message-control/controllers';
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

export const fetchSubjects = () => (dispatch) => {
  console.log('fetching subjects');
  return getSubjects()
    .then((res) => dispatch(setSubjectsData(res)))
    .catch((err) => console.log(err));
};

export const sortSubjects = (sortCol) => {
  console.log(sortCol);
};
