const subjectSortBy = (col) => {
  switch (col) {
    case 'titles':
      return 'total';
    default:
      return `subjects.${col}`;
  }
};

module.exports = subjectSortBy;
