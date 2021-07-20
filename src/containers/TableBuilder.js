import { DefaultTable, TableCell, TableRow } from '../shared/components/Tables';

function TableBuilder({
  columns = [],
  sortColumn,
  sortDirection = 'ASC',
  handleSort = () => {},
  rows = [],
  onRowClick
}) {
  return (
    <DefaultTable
      columns={columns}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      handleSort={handleSort}
    >
      {rows.map((data = {}, index) => {
        const rowOnClick = typeof onRowClick === 'function'
          ? () => onRowClick(data)
          : null;
        return (
          <TableRow onClick={rowOnClick} key={`table-builder-row-${index}`}>
            {columns.map(({ key, Component }) => (
              <TableCell key={`row-${index}-${key}`}>
                {Component ? (<Component values={data[key]} />) : data[key] || ''}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </DefaultTable>
  );
}

export default TableBuilder;
