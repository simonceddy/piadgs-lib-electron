import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { FlexCol } from '../../shared/components/Flex';
import { fetchSubjects, sortSubjectRows } from '../../store/actions';
import { DefaultTable } from '../../shared/components/Tables';
import SubjectResultRow from '../../components/Subjects/SubjectResultRow';

const columns = [
  {
    key: 'name',
    name: 'Subject Name',
    sortable: true
  },
  {
    key: 'titles',
    name: 'Number of Titles',
    sortable: true
  }
];

function AllSubjects({
  subjects = [],
  getSubjects,
  onRowClick = () => null,
  sortSubjects,
  sortCol,
  sortDirection
}) {
  const [subjectsLoaded, setSubjectsLoaded] = useState(subjects.length > 0);
  useEffect(async () => {
    if (!subjectsLoaded) {
      await getSubjects();
      setSubjectsLoaded(true);
    }
  }, [subjectsLoaded]);

  console.log(subjects[0]);

  if (!subjectsLoaded) {
    return <div>Loading subjects...</div>;
  }

  return (
    <DefaultTable
      columns={columns}
      sortColumn={sortCol}
      sortDirection={sortDirection}
      handleSort={(e) => {
        console.log(e.target.id);
        sortSubjects(e.target.id);
      }}
    >
      {subjects.map((subject) => (
        <SubjectResultRow key={subject.id} subject={subject} onClick={() => onRowClick(subject)} />
      ))}
    </DefaultTable>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.admin.subjects.data,
  fetched: state.admin.subjects.fetched,
  sortCol: state.admin.subjects.sortCol,
  sortDirection: state.admin.subjects.sortDirection,
});

const mapDispatchToProps = (dispatch) => ({
  getSubjects: () => dispatch(fetchSubjects()),
  sortSubjects: (col) => dispatch(sortSubjectRows(col))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSubjects);
