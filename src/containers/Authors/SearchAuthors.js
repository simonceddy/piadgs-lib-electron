// import { useState } from 'react';
import { connect } from 'react-redux';
import ResultRow from '../../components/Authors/ResultRow';
import { SingleFieldForm } from '../../shared/components/Forms';
import { DefaultTable } from '../../shared/components/Tables';
import { fetchAuthorsSearchResults, setAuthorsSearchInput, sortAuthorsResultRows } from '../../store/actions';

// TODO move to own thing so can be shared
const fields = [
  {
    key: 'surname',
    name: 'Surname',
    sortable: true
  },
  {
    key: 'given_names',
    name: 'Given Names',
    sortable: true
  },
];

const columns = [
  ...fields,
  {
    key: 'titles',
    name: 'Number of Titles',
    sortable: true
  }
];

function SearchAuthors({
  searchResults = [],
  sortCol,
  sortDirection,
  handleSort,
  submitSearch,
  onRowClick = () => null,
  input,
  setInput
}) {
  return (
    <>
      <SingleFieldForm
        submitLabel="Search Authors"
        input={input}
        setInput={setInput}
        onSubmit={submitSearch}
      />
      {searchResults.length < 1 ? null : (
        <DefaultTable
          sortColumn={sortCol}
          sortDirection={sortDirection}
          handleSort={(e) => {
            // console.log(e.target.id);
            handleSort(e.target.id);
          }}
          columns={columns}
        >
          {searchResults.map((author = {}) => (
            <ResultRow
              onClick={() => onRowClick(author)}
              key={author.id}
              author={author}
              columns={fields}
            />
          ))}
        </DefaultTable>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  input: state.authors.authorSearch.input,
  searchResults: state.authors.authorSearch.results,
  sortCol: state.authors.authorSearch.sortCol,
  sortDirection: state.authors.authorSearch.sortDirection
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (key) => dispatch(sortAuthorsResultRows(key)),
  submitSearch: (input) => dispatch(fetchAuthorsSearchResults(input)),
  setInput: (input) => dispatch(setAuthorsSearchInput(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAuthors);
