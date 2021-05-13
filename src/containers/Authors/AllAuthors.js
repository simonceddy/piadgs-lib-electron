import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAuthors } from '../../store/actions';
import { DefaultTable } from '../../shared/components/Tables';
import ResultRow from '../../components/Authors/ResultRow';

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

function AllAuthors({ authors = [], getAuthors }) {
  const [authorsLoaded, setAuthorsLoaded] = useState(authors.length > 0);
  useEffect(async () => {
    if (!authorsLoaded) {
      await getAuthors();
      setAuthorsLoaded(true);
    }
  }, [authorsLoaded]);

  if (!authorsLoaded) {
    return <div>Loading authors...</div>;
  }

  return (
    <DefaultTable
      columns={columns}
    >
      {authors.map((author) => (
        <ResultRow columns={fields} key={author.id} author={author} />
      ))}
    </DefaultTable>
  );
}

const mapStateToProps = (state) => ({
  authors: state.admin.authors.data,
  fetched: state.admin.authors.fetched
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(fetchAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAuthors);
