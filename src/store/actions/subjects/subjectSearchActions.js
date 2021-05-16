import { searchLibrarySubjects } from '../../../message-control/controllers';
import { flipDirection, sortPropAZ, sortPropLength } from '../../../util/sort';

export const SET_SUBJECT_SEARCH_INPUT = 'SET_SUBJECT_SEARCH_INPUT';
export const SET_SUBJECT_SEARCH_RESULTS = 'SET_SUBJECT_SEARCH_RESULTS';
export const SET_SUBJECT_SORT_RESULTS = 'SET_SUBJECT_SORT_RESULTS';

export const setSubjectSearchInput = (input) => ({
  type: SET_SUBJECT_SEARCH_INPUT,
  payload: { input }
});

export const setSubjectSearchResults = (results) => ({
  type: SET_SUBJECT_SEARCH_RESULTS,
  payload: { results }
});

export const setSubjectSortResults = (sortKey, sortDirection) => ({
  type: SET_SUBJECT_SORT_RESULTS,
  payload: { sortKey, sortDirection }
});

export const performSubjectSearch = (input) => (dispatch) => searchLibrarySubjects({
  name: input
})
  .then((res) => dispatch(setSubjectSearchResults(res.results || [])))
  .catch((err) => console.log(err));

export const sortSearchResults = (key) => async (dispatch, getState) => {
  const { results, sortKey, sortDirection } = getState().subjects.subjectSearch;
  const isSameKey = key === sortKey;
  // console.log(sortDirection, isSameKey);

  const direction = isSameKey ? flipDirection(sortDirection) : sortDirection;

  return Promise.resolve(dispatch(setSubjectSortResults(
    key,
    direction
  )))
    .then(() => {
      const sorted = key === 'titles'
        ? sortPropLength(results, 'titles')
        : sortPropAZ(results, 'name');

      return dispatch(setSubjectSearchResults(
        direction === 'DESC'
          ? sorted.reverse()
          : sorted
      ));
    })
    .catch((err) => console.log(err));
};
