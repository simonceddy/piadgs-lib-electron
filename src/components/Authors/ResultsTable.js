import { StyledTbody, StyledTh } from '../../shared/components/Styled';

function ResultsTable({
  children,
  columns = [],
  handleSort = () => null,
  sortCol,
  sortDirection
}) {
  const sortDirIcon = sortDirection === 'ASC' ? '▲' : '▼';

  return (
    <div className="flex flex-col justify-start items-start w-full h-full overflow-y-scroll">
      <table className="w-full">
        <thead>
          <tr>
            {columns.map(({ name, key }) => (
              <StyledTh
                onClick={() => handleSort(key)}
                className={`border-2 ${sortCol === key ? 'underline' : ''}`}
                key={key}
              >
                {name} {sortCol === key ? sortDirIcon : null}
              </StyledTh>
            ))}
            <StyledTh
              className={`border-2 ${sortCol === 'titles' ? 'underline' : ''}`}
              onClick={() => handleSort('titles')}
            >
              Titles {sortCol === 'titles' ? sortDirIcon : null}
            </StyledTh>
          </tr>
        </thead>
        <StyledTbody
          className="border-1 w-full"
        >
          {children}
        </StyledTbody>
      </table>
    </div>
  );
}

export default ResultsTable;
