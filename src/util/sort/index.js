export const sortPropAZ = (dataObjects = [], prop) => [...dataObjects].sort(
  (a, b) => a[prop].localeCompare(b[prop])
);

export const sortPropNumeric = (dataObjects = [], prop) => [...dataObjects].sort(
  (a, b) => Number(a[prop]) - Number(b[prop])
);

export const sortPropLength = (dataObjects = [], prop) => [...dataObjects].sort(
  (a, b) => a[prop].length - b[prop].length
);
