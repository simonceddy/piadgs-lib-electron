import { connect } from 'react-redux';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { LgFormButton } from '../../shared/components/Forms';
// import columns from '../../util/columns';
import TitlesTable from '../../components/Admin/Titles/TitlesTable';
import { Pagination } from '../../components/Pagination';
import { setResultsPage, sortLibrarySearchResults } from '../../store/actions';
import { publicCols } from '../../shared/data/titleCols';

// TODO count total results in query and replace results.length
function Results({
  results = [],
  handleSort,
  sortDirection,
  sortColumn,
  showForm = () => null,
  currentPage = 1,
  // lastPage = 12,
  setPage = () => null,
  itemsPerPage = 32,
  totalResults
}) {
  return (
    <FlexCol className="w-full flex-1 py-4 px-8 justify-between items-center">
      <FlexRow className="p-4 w-full justify-around items-center">
        <LgFormButton onClick={showForm}>Refine Search</LgFormButton>
        <div className="text-xl">Found {totalResults || 0} results.</div>
      </FlexRow>
      <Pagination
        current={currentPage}
        lastPage={Math.ceil(totalResults / itemsPerPage)}
        setPage={(page) => setPage(page)}
      />
      {results.length < 1 ? (
        <FlexCol>No results were found</FlexCol>
      ) : (
        <TitlesTable
          columns={publicCols}
          sortCol={sortColumn}
          handleSort={(e) => handleSort(e.target.id)}
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
  sortColumn: state.search.sortCol,
  sortDirection: state.search.sortDirection,
  currentPage: state.search.currentPage,
  itemsPerPage: state.search.itemsPerPage,
  totalResults: state.search.totalResults,
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (col) => dispatch(sortLibrarySearchResults(col)),
  setPage: (page) => dispatch(setResultsPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
