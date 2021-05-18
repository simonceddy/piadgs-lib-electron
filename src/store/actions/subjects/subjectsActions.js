import { getSubjects } from '../../../message-control/controllers';
import { flipDirection, sortSubjects } from '../../../util/sort';
// import { flipDirection, sortPropAZ, sortPropLength } from '../../../util/sort';

export const SET_SUBJECTS_DATA = 'SET_SUBJECTS_DATA';
export const SET_SORT_SUBJECTS = 'SET_SORT_SUBJECTS';
export const SET_SUBJECTS_CURRENT_PAGE = 'SET_SUBJECTS_CURRENT_PAGE';
export const SET_SUBJECTS_ITEMS_PER_PAGE = 'SET_SUBJECTS_ITEMS_PER_PAGE';

export const setSubjectsItemsPerPage = (itemsPerPage) => ({
  type: SET_SUBJECTS_ITEMS_PER_PAGE,
  payload: { itemsPerPage }
});

export const setSubjectsCurrentPage = (currentPage) => ({
  type: SET_SUBJECTS_CURRENT_PAGE,
  payload: { currentPage }
});

export const setSubjectsData = (data) => ({
  type: SET_SUBJECTS_DATA,
  payload: { data }
});

export const setSortSubjects = (sortCol, sortDirection) => ({
  type: SET_SORT_SUBJECTS,
  payload: { sortCol, sortDirection }
});

// Local sorting
export const sortAndSetSubjects = (data) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().subjects.subjects;

  const sorted = sortSubjects(data, sortCol);

  return dispatch(setSubjectsData(
    sortDirection === 'ASC' ? sorted : sorted.reverse(),
  ));
};

export const fetchSubjects = () => (dispatch, getState) => {
  console.log('fetching subjects');
  const {
    sortCol, sortDirection, currentPage, itemsPerPage
  } = getState().subjects.subjects;

  return getSubjects(currentPage, itemsPerPage, sortCol, sortDirection)
    .then((res) => {
      console.log(res);
      return dispatch(setSubjectsData(res));
    })
    .catch((err) => console.log(err));
};

export const sortSubjectRows = (col) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().subjects.subjects;
  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setSortSubjects(col, direction)))
    .then(() => dispatch(fetchSubjects()));
};
