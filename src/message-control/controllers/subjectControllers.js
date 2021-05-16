import types from '../../backend/messageTypes';
import controllerMessage from './controllerMessage';

export const getLibrarySubject = (params) => controllerMessage(
  types.getSubject.send,
  types.getSubject.reply,
  params
);
export const searchLibrarySubjects = (params) => controllerMessage(
  types.searchSubjects.send,
  types.searchSubjects.reply,
  params
);

export const getSubjects = () => controllerMessage(
  types.getAllSubjects.send,
  types.getAllSubjects.reply,
);

export const updateSubjectData = (params) => controllerMessage(
  types.updateSubject.send,
  types.updateSubject.reply,
  params
);

export const countSubjects = () => controllerMessage(
  types.countSubjects.send,
  types.countSubjects.reply,
);

export const createSubject = (params) => controllerMessage(
  types.createSubject.send,
  types.createSubject.reply,
  params
);
