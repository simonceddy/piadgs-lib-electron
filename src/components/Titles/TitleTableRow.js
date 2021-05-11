import { TableCell, TableRow } from '../../shared/components/Tables';

function TitleTableRow({ title, columns }) {
  return (
    <TableRow>
      {columns.map(({ key }) => (
        <TableCell key={`${key}-${title.id}`}>
          {title[key] || ''}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default TitleTableRow;
