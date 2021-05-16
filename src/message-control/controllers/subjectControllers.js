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

export const getSubjects = () => controllerMessage(
  types.getAllSubjects,
);

export const updateSubjectData = (params) => controllerMessage(
  types.updateSubject,
  params
);

export const countSubjects = () => controllerMessage(
  types.countSubjects,
);

export const createSubject = (params) => controllerMessage(
  types.createSubject,
  params
);
