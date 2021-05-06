import { useState } from 'react';
import { connect } from 'react-redux';
import AuthorSearchForm from '../../components/Authors/AuthorSearchForm';
import { ThemedButton, ThemedTextInput } from '../../shared/components/Styled';
import { fetchSearchResults } from '../../store/actions/authors';

function SearchAuthors({ submitSearch }) {
  const [inputVal, setInputVal] = useState('');

  return (
    <AuthorSearchForm
      onSubmit={() => submitSearch(inputVal)}
    >
      <ThemedTextInput
        required
        label="Search authors:"
        labelClassName="text-xl"
        className="text-xl"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <ThemedButton
        submits
        className="m-2"
      >
        Search Authors
      </ThemedButton>
    </AuthorSearchForm>
  );
}

// const mapStateToProps = (state) => ({
//   // inputVal: state.authors.authorSearch.input
// });

const mapDispatchToProps = (dispatch) => ({
  // setInputVal: (val) => dispatch(setSearchInput(val)),
  submitSearch: (input) => dispatch(fetchSearchResults(input))
});

export default connect(null, mapDispatchToProps)(SearchAuthors);
