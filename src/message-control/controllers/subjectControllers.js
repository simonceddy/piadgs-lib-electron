import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibrarySubject = (params) => controllerMessage(
  types.getSubject,
  params
);
export const searchLibrarySubjects = (params) => controllerMessage(
  types.searchSubjects,
  params
);

export const getSubjects = ({
  filter = {},
  page,
  itemsPerPage,
  sortColumn,
  sortDirection
}) => controllerMessage(
  types.getAllSubjects,
  {
    filter, page, itemsPerPage, sortColumn, sortDirection
  }
);

export const updateSubjectData = (params) => controllerMessage(
  types.updateSubject,
  params
);

export const countSubjects = (filter) => controllerMessage(
  types.countSubjects,
  { filter }
);

export const createSubject = (params) => controllerMessage(
  types.createSubject,
  params
);

export const deleteSubject = (id) => controllerMessage(
  types.deleteSubject,
  { id }
);
