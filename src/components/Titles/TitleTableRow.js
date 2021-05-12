import { TableCell, TableRow } from '../../shared/components/Tables';

function TitleTableRow({ title, columns, onClick }) {
  return (
    <TableRow onClick={onClick}>
      {columns.map(({ key, Component }) => (
        <TableCell key={`${key}-${title.id}`}>
          {Component ? (<Component values={title[key]} />) : title[key] || ''}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TitleTableRow;
