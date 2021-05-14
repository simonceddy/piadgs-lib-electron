import { connect } from 'react-redux';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { LgFormButton } from '../../shared/components/Forms';
import columns from '../../util/columns';
import TitlesTable from '../../components/Admin/Titles/TitlesTable';

function Results({
  results = [],
  handleSort,
  sortDirection,
  sortColumn,
  showForm = () => null
}) {
  return (
    <FlexCol className="w-full flex-1 py-4 px-8 justify-between items-center">
      <FlexRow className="p-4 w-full justify-around items-center">
        <LgFormButton onClick={showForm}>Refine Search</LgFormButton>
        <div className="text-xl">Found {results.length} results.</div>
      </FlexRow>
      {results.length < 1 ? (
        <FlexCol>No results were found</FlexCol>
      ) : (
        <TitlesTable
          columns={columns}
          sortCol={sortColumn}
          handleSort={(e) => {
            const { id } = e.target;
            const newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
            handleSort(
              id,
              id === sortColumn ? newDirection : sortDirection
            );
          }}
          sortDirection={sortDirection}
          titles={results}
          isEditing={false}
          onDelete={() => null}
        />
      )}
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  results: state.search.results,
  sortColumn: state.titles.titles.sortColumn,
  sortDirection: state.titles.titles.sortDirection
});

export default connect(mapStateToProps)(Results);
