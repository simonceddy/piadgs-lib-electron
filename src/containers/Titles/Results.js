import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { LgFormButton } from '../../shared/components/Forms';
import columns from '../../util/columns';
import useQuery from '../../hooks/useQuery';
import { fetchResults, setResults, sortTitles } from '../../store/actions';
import sortRows from '../../util/sort/sortRows';
import TitlesTable from '../../components/Admin/Titles/TitlesTable';

function Results({
  results = [],
  getResults,
  lastQuery,
  resultsFetched = false,
  handleSort,
  sortDirection,
  sortColumn
}) {
  const query = useQuery();

  useEffect(() => {
    if (query.toString() !== lastQuery) {
      getResults(query.toString());
    }
  }, [query, lastQuery]);

  if (!resultsFetched) {
    return <FlexCol>Fetching results...</FlexCol>;
  }

  if (resultsFetched && results.length < 1) {
    return <FlexCol>No results were found</FlexCol>;
  }

  return (
    <FlexCol className="w-full flex-1 py-4 px-8 justify-between items-center">
      <FlexRow className="p-4 w-full justify-around items-center">
        <NavLink to="/searchForm"><LgFormButton>Refine Search</LgFormButton></NavLink>
        <div className="text-xl">Found {results.length} results.</div>
      </FlexRow>
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
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  results: state.titles.results.results,
  lastQuery: state.titles.results.lastQuery,
  resultsFetched: state.titles.results.fetched,
  fetchingResults: state.titles.results.fetching,
  sortColumn: state.titles.titles.sortColumn,
  sortDirection: state.titles.titles.sortDirection
});

const mapDispatchToProps = (dispatch) => ({
  getResults: (query) => dispatch(fetchResults(query)),
  handleSort: (sortColumn, sortDirection) => dispatch(sortTitles({
    sortColumn, sortDirection
  }, (getState) => dispatch(setResults(sortRows(
    getState().titles.sortColumn,
    getState().titles.sortDirection,
    getState().titles.results.results
  )))))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
