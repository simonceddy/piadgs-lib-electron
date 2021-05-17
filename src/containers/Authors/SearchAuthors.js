import { useState } from 'react';
import { connect } from 'react-redux';
import ResultRow from '../../components/Authors/ResultRow';
import { SingleFieldForm } from '../../shared/components/Forms';
import { DefaultTable } from '../../shared/components/Tables';
import { fetchAuthorsSearchResults } from '../../store/actions/authors';

// TODO move to own thing so can be shared
const fields = [
  {
    key: 'surname',
    name: 'Surname'
  },
  {
    key: 'given_names',
    name: 'Given Names'
  },
];

const columns = [
  ...fields,
  {
    key: 'titles',
    name: 'Number of Titles'
  }
];

function SearchAuthors({
  searchResults = [],
  sortCol,
  sortDirection,
  handleSort,
  submitSearch,
  onRowClick = () => null
}) {
  const [input, setInput] = useState('');

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
          handleSort={handleSort}
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
  searchResults: state.authors.authorSearch.results,
  sortCol: state.authors.authorSearch.sortCol,
  sortDirection: state.authors.authorSearch.sortDirection
});

const mapDispatchToProps = (dispatch) => ({
  // handleSort: (key) => dispatch(sortSearchResults(key)),
  submitSearch: (input) => dispatch(fetchAuthorsSearchResults(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAuthors);
