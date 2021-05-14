import controllerMessage from './controllerMessage';

export const getLibrarySubject = (params) => controllerMessage(
  'get-subject',
  'fetched-subject',
  params
);
export const searchLibrarySubjects = (params) => controllerMessage(
  'search-subjects',
  'subjects-search-results',
  params
);

export const getSubjects = () => controllerMessage('get-subjects', 'send-subjects');

export const updateSubjectData = (params) => controllerMessage('update-subject', 'update-subject-result', params);

export const countSubjects = () => controllerMessage('count-subjects', 'send-subjects-count');
