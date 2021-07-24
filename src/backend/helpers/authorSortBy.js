const authorSortBy = (col) => {
  switch (col) {
    case 'total':
      return 'total';
    default:
      return `authors.${col}`;
  }
};

module.exports = authorSortBy;
