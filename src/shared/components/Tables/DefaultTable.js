import TableHeader from './TableHeader';

// eslint-disable-next-line no-unused-vars
function DefaultTable({
  columns = [],
  children,
  handleSort = () => null,
  sortDirection,
  sortColumn
}) {
  return (
    <div className="flex-1 w-full py-4 pl-4 overflow-scroll pr-5 text-sm">
      <table className="w-full">
        <thead>
          <tr>
            {/* TODO handle sort */}
            {columns.map((col, id) => (
              <TableHeader
                className="cursor-pointer"
                id={col.key}
                sortingBy={sortColumn === col.key}
                sortDirection={sortDirection}
                key={id}
                onClick={col.sortable ? handleSort : null}
              >
                {col.name}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default DefaultTable;
