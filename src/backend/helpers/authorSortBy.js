const authorSortBy = (col) => {
  switch (col) {
    case 'titles':
      return 'total';
    default:
      return `authors.${col}`;
  }
};

module.exports = authorSortBy;
