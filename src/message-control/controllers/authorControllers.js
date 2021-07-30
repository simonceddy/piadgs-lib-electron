import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibraryAuthor = (params) => controllerMessage(
  types.getAuthor,
  params
);
export const searchLibraryAuthors = (params) => controllerMessage(
  types.searchAuthors,
  params
);
export const getAuthors = ({
  page,
  itemsPerPage,
  sortColumn,
  sortDirection,
  filter = {}
}) => controllerMessage(
  types.getAllAuthors,
  {
    page, itemsPerPage, sortColumn, sortDirection, filter
  }
);
export const countAuthors = (filter) => controllerMessage(
  types.countAuthors,
  { filter }
);

export const createAuthor = (params) => controllerMessage(
  types.createAuthor,
  params
);

export const updateAuthorData = (params) => controllerMessage(
  types.updateAuthor,
  params
);

export const deleteAuthor = (id) => controllerMessage(
  types.deleteAuthor,
  { id }
);
