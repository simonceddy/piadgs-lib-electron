import { connect } from 'react-redux';
import Results from './Results';
import SubjectSearch from './SubjectSearch';
import { sortSearchResults } from '../../store/actions/subjects';
import { FlexCol } from '../../shared/components/Flex';

function SearchSubjects({ results, handleSort, onRowClick }) {
  return (
    <FlexCol className="w-full h-full justify-start items-center">
      <SubjectSearch />
      {results.length > 0 ? (
        <Results onRowClick={onRowClick} sortBy={handleSort} subjects={results} />
      ) : null}
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  results: state.subjects.subjectSearch.results
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (key) => dispatch(sortSearchResults(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSubjects);
