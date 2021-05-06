import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAuthors } from '../../store/actions';

function ViewAuthors({ authors = [], fetched, getAuthors }) {
  useEffect(() => {
    if (!fetched) {
      getAuthors();
    }
  }, [fetched]);

  return (
    <>
      Authors list
      {authors.map((author, key) => (
        <div key={key}>
          {author.surname}{author.givenNames
            ? `, ${author.givenNames}` : null}
        </div>
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  authors: state.admin.authors.data,
  fetched: state.admin.authors.fetched
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(fetchAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAuthors);
