import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAuthors } from '../../store/actions';
import { DefaultTable } from '../../shared/components/Tables';
import ResultRow from '../../components/Authors/ResultRow';
import { Pagination } from '../../components/Pagination';

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

function AllAuthors({
  authors = [],
  getAuthors,
  onRowClick = () => null,
  currentPage,
  lastPage
}) {
  useEffect(async () => {
    console.log('fetching authors');
    await getAuthors();
  }, [currentPage]);

  console.log(currentPage);

  if (authors.length < 1) {
    return <div>Loading authors...</div>;
  }

  return (
    <>
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={(page) => console.log(page)}
      />
      <DefaultTable
        columns={columns}
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
  getAuthors: () => dispatch(fetchAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAuthors);
