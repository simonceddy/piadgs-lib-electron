import { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../components/Authors/AppLayout';
import ResultRow from '../../components/Authors/ResultRow';
import ResultsTable from '../../components/Authors/ResultsTable';
import Author from './Author';
import SearchAuthors from './SearchAuthors';
import Modal from '../../shared/components/Modal';
import { sortSearchResults } from '../../store/actions/authors';

const tableCols = [
  {
    name: 'Surname',
    key: 'surname'
  },
  {
    name: 'Given Names',
    key: 'givenNames'
  },
];

function Authors({
  searchResults = [],
  sortCol,
  sortDirection,
  handleSort
}) {
  // console.log(searchResults);
  const [authorModalId, setAuthorModalId] = useState(false);

  const onClose = () => setAuthorModalId(false);

  const AuthorModal = useMemo(() => (!authorModalId ? null : (
    <Modal onClose={onClose}>
      <Author onClose={onClose} id={authorModalId} />
    </Modal>
  )), [authorModalId]);

  return (
    <AppLayout>
      {AuthorModal}
      <SearchAuthors />
      {searchResults.length < 1 ? null : (
        <ResultsTable
          sortCol={sortCol}
          sortDirection={sortDirection}
          handleSort={handleSort}
          columns={tableCols}
        >
          {searchResults.map((author = {}) => (
            <ResultRow
              onClick={() => setAuthorModalId(author.id)}
              key={author.id}
              author={author}
              columns={tableCols}
            />
          ))}
        </ResultsTable>
      )}
    </AppLayout>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.authors.authorSearch.results,
  sortCol: state.authors.authorSearch.sortCol,
  sortDirection: state.authors.authorSearch.sortDirection
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (key) => dispatch(sortSearchResults(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authors);
