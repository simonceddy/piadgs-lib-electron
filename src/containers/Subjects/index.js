import { connect } from 'react-redux';
import { ThemedDiv } from '../../shared/components/Styled';
import Results from './Results';
import SubjectSearch from './SubjectSearch';
import { sortSearchResults } from '../../store/actions/subjects';

function Subjects({ results, handleSort }) {
  return (
    <ThemedDiv className="w-full h-full">
      <div className="mx-auto sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 w-full h-full flex flex-col justify-start items-center">
        <SubjectSearch />
        {results.length > 0 ? (
          <Results sortBy={handleSort} subjects={results} />
        ) : null}
      </div>
    </ThemedDiv>
  );
}

const mapStateToProps = (state) => ({
  results: state.subjects.subjectSearch.results
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (key) => dispatch(sortSearchResults(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
