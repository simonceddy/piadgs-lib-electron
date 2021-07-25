import {
  getSubjects,
  countSubjects,
  updateSubjectData,
  getLibrarySubject,
  createSubject,
  // deleteSubject,
  searchLibrarySubjects
} from '../../message-control/controllers';
import { flipDirection } from '../../util/sort';

export const SET_SUBJECT_SELECTED_TITLES = 'SET_SUBJECT_SELECTED_TITLES';
export const SET_SUBJECT_NAME = 'SET_SUBJECT_NAME';
export const SET_SUBJECT_DATA = 'SET_SUBJECT_DATA';
export const SET_SUBJECT_MESSAGE = 'SET_SUBJECT_MESSAGE';
export const RESET_SUBJECT = 'RESET_SUBJECT';
export const SET_SUBJECT_FORM_INPUT = 'SET_SUBJECT_FORM_INPUT';
export const SET_SUBJECT_FORM_TILES = 'SET_SUBJECT_FORM_TILES';
export const SET_SUBJECTS_DATA = 'SET_SUBJECTS_DATA';
export const SET_SORT_SUBJECTS = 'SET_SORT_SUBJECTS';
export const SET_SUBJECTS_CURRENT_PAGE = 'SET_SUBJECTS_CURRENT_PAGE';
export const SET_SUBJECTS_ITEMS_PER_PAGE = 'SET_SUBJECTS_ITEMS_PER_PAGE';
export const SET_SUBJECTS_LAST_PAGE = 'SET_SUBJECTS_LAST_PAGE';
export const SET_FILTERING_SUBJECTS = 'SET_FILTERING_SUBJECTS';
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

export const setSubjectsLastPage = (lastPage) => ({
  type: SET_SUBJECTS_LAST_PAGE,
  payload: { lastPage }
});

export const setFilteringSubjects = (filtering = false) => ({
  type: SET_FILTERING_SUBJECTS,
  payload: { filtering }
});

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

export const resetSubject = () => ({
  type: RESET_SUBJECT
});

export const setSubjectSelectedTitles = (selectedTitles) => ({
  type: SET_SUBJECT_SELECTED_TITLES,
  payload: { selectedTitles }
});

export const setSubjectName = (name) => ({
  type: SET_SUBJECT_NAME,
  payload: { name }
});

export const setSubjectData = (data) => ({
  type: SET_SUBJECT_DATA,
  payload: { data }
});

export const setSubjectMessage = (message) => ({
  type: SET_SUBJECT_MESSAGE,
  payload: { message }
});

export const setSubjectFormInput = (input) => ({
  type: SET_SUBJECT_FORM_INPUT,
  payload: { input }
});

export const setSubjectFormTitles = (titles) => ({
  type: SET_SUBJECT_FORM_TILES,
  payload: { titles }
});

export const clearSubjectForm = () => (dispatch) => Promise
  .resolve(dispatch(setSubjectFormInput({ name: '' })))
  .then(() => dispatch(setSubjectFormTitles([])));

export const saveSubject = () => (dispatch, getState) => {
  const { input, titles } = getState().subjects.subjectForm;

  return Promise.resolve(createSubject({ ...input, titles }))
    .then((result) => {
      // console.log(result);
      if (!result.success) {
        return dispatch(setSubjectMessage('An error occurred trying to save the subject!'));
      }
      return dispatch(setSubjectMessage(`Saved successfully with ID ${result.id[0]}`));
    });
};

export const addSubjectTitle = (title) => (dispatch, getState) => dispatch(
  setSubjectFormTitles([
    ...getState().subjects.subjectform.titles,
    title
  ])
);

export const updateSubject = (data) => (dispatch) => updateSubjectData(data)
  .then((res) => {
    console.log(res);
    // TODO handle response
    if (!res.data.data) {
      return dispatch(setSubjectMessage('Error retrieving updated data!'));
    }
    return Promise.resolve(dispatch(setSubjectData(res.data.data)))
      .then(() => dispatch(setSubjectMessage('Changes saved successfully!')))
      .catch((err) => dispatch(setSubjectMessage(`Error: ${err.message}`)));
  })
  .catch((err) => {
    console.log(err);
    return dispatch(setSubjectData({}));
  });

// TODO clean this up a bit - why both data and name
// That said, implement useState on form and update redux on update to avoid
// adding unsaved data to app
export const setData = (data = {}) => (dispatch) => Promise.resolve(
  dispatch(setSubjectData(data))
)
  .then(() => Promise.resolve(dispatch(setSubjectName(data.name))))
  .then(() => dispatch(setSubjectSelectedTitles(
    Object.fromEntries(data.titles.map(({ id: titleId }) => [titleId, true]))
  )));

export const fetchSubject = (id) => (dispatch) => getLibrarySubject({ id })
  .then((res) => dispatch(setData(res)))
  .catch((err) => {
    console.log(err);
    return dispatch(setSubjectData({}));
  });

export const fetchSubjects = (filter = {}) => async (dispatch, getState) => {
  // console.log('fetching subjects');
  const {
    sortCol, sortDirection, currentPage, itemsPerPage
  } = getState().subjects.subjects;

  const total = await countSubjects(filter)
    .catch(console.log);

  return Promise.resolve(dispatch(setSubjectsLastPage(Math.ceil(total / itemsPerPage))))
    .then(() => getSubjects({
      page: currentPage,
      itemsPerPage,
      sortColumn: sortCol,
      sortDirection,
      filter
    })
      .then((res) => dispatch(setSubjectsData(res)))
      .catch((err) => console.log(err)));
};

export const sortSubjectRows = (col, filter = {}) => (dispatch, getState) => {
  const { sortCol, sortDirection } = getState().subjects.subjects;
  const direction = col === sortCol ? flipDirection(sortDirection) : sortDirection;
  return Promise.resolve(dispatch(setSortSubjects(col, direction)))
    .then(() => dispatch(fetchSubjects(filter)))
    .catch(console.log);
};

export const performSubjectSearch = (input) => (dispatch) => searchLibrarySubjects({
  name: input
})
  // .then((res) => dispatch(setSubjectSearchResults(res.results || [])))
  .then((res) => dispatch(setSubjectsData(res.results || [])))
  .catch((err) => console.log(err));
