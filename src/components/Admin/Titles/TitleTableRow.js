import { Link } from 'react-router-dom';
import {
  DangerButton, InfoButton, ToolbarButton, WarnButton
} from '../../../shared/components/Buttons';
import { TableCell, TableRow } from '../../../shared/components/Tables';

function TitleTableRow({
  columns = [],
  title = {},
  onClick,
  utilsActive = false,
  onDelete
}) {
  return (
    <>
      <TableRow
        onClick={onClick}
      >
        {columns.map((col, key) => {
          const Component = col.Component || false;
          return (
            <TableCell
              key={key}
            >
              {Component
                ? <Component values={title[col.key]} />
                : title[col.key]}
            </TableCell>
          );
        })}
      </TableRow>
      {!utilsActive ? null : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="p-1"
          >
            <Link to={`/admin/title/${title.id}`} className="mx-2 my-1">
              <ToolbarButton
                Button={InfoButton}
              >
                View
              </ToolbarButton>
            </Link>
            <Link to={`/admin/title/edit/${title.id}`} className="mx-2 my-1">
              <ToolbarButton
                Button={WarnButton}
              >
                Edit
              </ToolbarButton>
            </Link>
            <ToolbarButton
              Button={DangerButton}
              onClick={onDelete}
              className="mx-2 my-1"
            >
              Delete
            </ToolbarButton>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default TitleTableRow;
