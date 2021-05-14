import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { FlexCol } from '../../shared/components/Flex';
import { fetchSubjects } from '../../store/actions';
import { DefaultTable } from '../../shared/components/Tables';
import SubjectResultRow from '../../components/Subjects/SubjectResultRow';

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

function AllSubjects({
  subjects = [],
  getSubjects,
  onRowClick = () => null
}) {
  const [subjectsLoaded, setSubjectsLoaded] = useState(subjects.length > 0);
  useEffect(async () => {
    if (!subjectsLoaded) {
      await getSubjects();
      setSubjectsLoaded(true);
    }
  }, [subjectsLoaded]);

  console.log(subjects);

  if (!subjectsLoaded) {
    return <div>Loading subjects...</div>;
  }

  return (
    <DefaultTable
      columns={columns}
    >
      {subjects.map((subject) => (
        <SubjectResultRow key={subject.id} subject={subject} onClick={() => onRowClick(subject)} />
      ))}
    </DefaultTable>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.admin.subjects.data,
  fetched: state.admin.subjects.fetched
});

const mapDispatchToProps = (dispatch) => ({
  getSubjects: () => dispatch(fetchSubjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSubjects);
