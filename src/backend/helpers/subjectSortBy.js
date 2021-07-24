const subjectSortBy = (col) => {
  switch (col) {
    case 'total':
      return 'total';
    default:
      return `subjects.${col}`;
  }
};

module.exports = subjectSortBy;
