import { connect } from 'react-redux';
import Results from './Results';
import SubjectSearch from './SubjectSearch';
import { sortSearchResults } from '../../store/actions/subjects';
import Toolbar from '../../components/Toolbar';
import { CreateIcon, SearchIcon } from '../../shared/components/Icons';
import { FlexCol } from '../../shared/components/Flex';

const toolbarItems = [
  [
    { key: 'createSubject', Icon: CreateIcon },
    { key: 'search', Icon: SearchIcon }
  ]
];

function Subjects({ results, handleSort }) {
  return (
    <FlexCol className="w-full h-full justify-start items-center">
      <Toolbar items={toolbarItems} />
      <FlexCol className="mx-auto sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 w-full h-full justify-start items-center">
        <SubjectSearch />
        {results.length > 0 ? (
          <Results sortBy={handleSort} subjects={results} />
        ) : null}
      </FlexCol>
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  results: state.subjects.subjectSearch.results
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (key) => dispatch(sortSearchResults(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);
