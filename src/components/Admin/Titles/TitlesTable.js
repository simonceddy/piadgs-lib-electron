import { DefaultTable } from '../../../shared/components/Tables';
import TitleTableRow from './TitleTableRow';

function TitlesTable({
  sortCol,
  columns = [],
  handleSort,
  sortDirection,
  titles = [],
  rowOnClick,
  isEditing,
  onDelete
}) {
  return (
    <>
      <DefaultTable
        sortColumn={sortCol}
        columns={columns}
        handleSort={handleSort}
        sortDirection={sortDirection}
      >
        {titles.map((title, id) => (
          <TitleTableRow
            onClick={rowOnClick ? () => rowOnClick(title) : null}
            key={id}
            columns={columns}
            title={title}
            utilsActive={isEditing === title.id}
            onDelete={() => onDelete(title.id)}
          />
        ))}
      </DefaultTable>
    </>
  );
}

export default TitlesTable;
