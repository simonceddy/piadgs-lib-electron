import { DefaultTable, TableCell, TableRow } from '../shared/components/Tables';

function TableBuilder({
  columns = [],
  sortColumn,
  sortDirection = 'ASC',
  handleSort = () => {},
  rows = [],
  onRowClick,
  dataHandlers = {},
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
            {columns.map(({ key, Component }) => {
              console.log();
              const val = dataHandlers[key] ? dataHandlers[key](data, index) : data[key];
              return (
                <TableCell key={`row-${index}-${key}`}>
                  {Component ? (<Component values={val} />) : val || ''}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </DefaultTable>
  );
}

export default TableBuilder;
