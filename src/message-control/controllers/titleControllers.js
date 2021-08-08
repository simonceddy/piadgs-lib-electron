import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibraryTitle = (params) => controllerMessage(
  types.getTitle,
  params
);

export const searchLibraryTitles = (params) => controllerMessage(
  types.searchTitles,
  params
);

export const getTitles = ({
  filter,
  page,
  itemsPerPage,
  sortColumn,
  sortDirection
}) => controllerMessage(
  types.getAllTitles,
  {
    page, itemsPerPage, sortColumn, sortDirection, filter
  }
);

export const countTitles = (filter) => controllerMessage(
  types.countTitles,
  {
    filter
  }
);

export const createTitles = (params) => controllerMessage({
  send: 'create-titles',
  reply: 'send-titles-created'
}, params);

export const createTitle = (params) => controllerMessage(
  types.createTitle,
  params
);

export const updateTitle = (params) => controllerMessage(
  types.updateTitle,
  params
);

export const deleteTitle = (id) => controllerMessage(
  types.deleteTitle,
  { id }
);

export const addTitleAuthor = (titleId, authorId) => controllerMessage(
  types.createAuthorTitle,
  {
    titleId,
    authorId
  }
);

export const addTitleSubject = (titleId, subjectId) => controllerMessage(
  types.createSubjectTitle,
  {
    titleId,
    subjectId
  }
);

export const deleteTitleAuthor = (titleId, authorId) => controllerMessage(
  types.deleteAuthorTitle,
  {
    titleId,
    authorId
  }
);

export const deleteTitleSubject = (titleId, subjectId) => controllerMessage(
  types.deleteSubjectTitle,
  {
    titleId,
    subjectId
  }
);
