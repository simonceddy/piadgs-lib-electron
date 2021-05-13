import { connect } from 'react-redux';
import { SingleFieldForm } from '../../shared/components/Forms';
import { performSearch, setSearchInput } from '../../store/actions/subjects';

function SubjectSearch({ submitSearch, input, setInput }) {
  return (
    <SingleFieldForm
      submitLabel="Search Subjects"
      input={input}
      setInput={setInput}
      onSubmit={submitSearch}
    />
  );
}

const mapStateToProps = (state) => ({
  input: state.subjects.subjectSearch.input
});

const mapDispatchToProps = (dispatch) => ({
  setInput: (input) => dispatch(setSearchInput(input)),
  submitSearch: (input) => dispatch(performSearch(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSearch);
