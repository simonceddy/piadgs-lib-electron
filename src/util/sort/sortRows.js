export default function sortRows(column, direction = 'NONE', titles = []) {
  if (direction !== 'DESC' && direction !== 'ASC') {
    // console.log('none received');
    return titles;
  }
  // console.log(`sorting ${column}`);
  let data = [...titles];

  // TODO sort handlers for author and subject
  switch (column) {
    case 'authors':
      data = data.sort((a, b) => a[column][0].surname.localeCompare(b[column][0].surname));
      break;
    case 'subjects':
      data = data.sort((a, b) => a[column][0].name.localeCompare(b[column][0].name));
      break;
    case 'title':
    case 'imprint':
    case 'source':
    case 'callNumber':
      data = data.sort((a, b) => a[column].localeCompare(b[column]));
      break;
    case 'accessionNumber':
      // console.log('sorting by accession number');
      data = data.sort((a, b) => Number(a[column]) - Number(b[column]));
      break;
    default:
  }
  // console.log(`${column} should be sorted`);
  return direction === 'DESC' ? data.reverse() : data;
}
