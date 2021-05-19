import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAuthors, setAuthorsCurrentPage, sortAuthorRows } from '../../store/actions';
import { DefaultTable } from '../../shared/components/Tables';
import ResultRow from '../../components/Authors/ResultRow';
import { Pagination } from '../../components/Pagination';

const fields = [
  {
    key: 'surname',
    name: 'Surname',
    sortable: true,
  },
  {
    key: 'given_names',
    name: 'Given Names',
    sortable: true,
  },
];

const columns = [
  ...fields,
  {
    key: 'titles',
    name: 'Number of Titles',
    sortable: true,
  }
];

function AllAuthors({
  authors = [],
  getAuthors,
  onRowClick = () => null,
  currentPage,
  lastPage,
  handleSort,
  sortCol,
  sortDirection,
  setPage
}) {
  useEffect(async () => {
    // console.log('fetching authors');
    await getAuthors();
  }, [currentPage]);

  // console.log(currentPage);

  if (authors.length < 1) {
    return <div>Loading authors...</div>;
  }

  return (
    <>
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      <DefaultTable
        columns={columns}
        sortColumn={sortCol}
        sortDirection={sortDirection}
        handleSort={(e) => {
          console.log(e.target.id);
          handleSort(e.target.id);
        }}
      >
        {authors.map((author) => (
          <ResultRow
            onClick={() => onRowClick(author)}
            columns={fields}
            key={author.id}
            author={author}
          />
        ))}
      </DefaultTable>
    </>
  );
}

const mapStateToProps = (state) => ({
  authors: state.admin.authors.data,
  fetched: state.admin.authors.fetched,
  sortCol: state.admin.authors.sortCol,
  sortDirection: state.admin.authors.sortDirection,
  itemsPerPage: state.admin.authors.itemsPerPage,
  currentPage: state.admin.authors.currentPage,
  lastPage: state.admin.authors.lastPage,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(fetchAuthors()),
  handleSort: (col) => dispatch(sortAuthorRows(col)),
  setPage: (page) => dispatch(setAuthorsCurrentPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAuthors);
