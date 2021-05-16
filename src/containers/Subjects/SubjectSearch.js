import { connect } from 'react-redux';
import { SingleFieldForm } from '../../shared/components/Forms';
import { performSubjectSearch, setSubjectSearchInput } from '../../store/actions/subjects';

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
  setInput: (input) => dispatch(setSubjectSearchInput(input)),
  submitSearch: (input) => dispatch(performSubjectSearch(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSearch);
