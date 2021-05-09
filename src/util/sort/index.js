export const sortPropAZ = (dataObjects = [], prop) => [...dataObjects].sort(
  (a, b) => (a[prop] || '').localeCompare(b[prop] || '')
);

export const sortPropNumeric = (dataObjects = [], prop) => [...dataObjects].sort(
  (a, b) => Number(a[prop] || 0) - Number(b[prop] || 0)
);

export const sortPropLength = (dataObjects = [], prop) => [...dataObjects].sort(
  (a, b) => (a[prop] || []).length - (b[prop] || []).length
);

export const flipDirection = (direction) => (
  direction === 'ASC' ? 'DESC' : 'ASC'
);

export const sortTitleAuthors = (titles = []) => titles.sort(
  (a, b) => (a.authors[0] ? a.authors[0].surname : '')
    .localeCompare(b.authors[0] ? b.authors[0].surname : '')
);

export const sortTitleSubjects = (titles = []) => titles.sort(
  (a, b) => (a.subjects[0] ? a.subjects[0].name : '')
    .localeCompare(b.subjects[0] ? b.subjects[0].name : '')
);
