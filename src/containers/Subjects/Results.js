import { connect } from 'react-redux';
import SubjectResultRow from '../../components/Subjects/SubjectResultRow';
import { sortSearchResults } from '../../store/actions/subjects';

const columns = [
  {
    key: 'name',
    name: 'Subject Name'
  },
  {
    key: 'titles',
    name: 'Number of Titles'
  }
];

function Results({
  results = [],
  handleSort = () => null,
  // sortKey,
  // sortDirection,
  onRowClick
}) {
  // console.log(sortKey, sortDirection);

  return (
    <>
      <div className="p-2 w-full h-full overflow-scroll flex-1 flex-col flex justify-start items-start">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map(({ key, name }) => (
                <th key={key} id={key} onClick={() => handleSort(key)}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {results.map((subject = {}) => (
              <SubjectResultRow
                onClick={() => onRowClick(subject)}
                key={`subject-row-${subject.id}`}
                subject={subject}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  results: state.subjects.subjectSearch.results,
  sortKey: state.subjects.subjectSearch.sortKey,
  sortDirection: state.subjects.subjectSearch.sortDirection,
});

const mapDispatchToProps = (dispatch) => ({
  handleSort: (key) => dispatch(sortSearchResults(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
