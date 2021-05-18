import { useEffect } from 'react';
import { connect } from 'react-redux';
// import { FlexCol } from '../../shared/components/Flex';
import { fetchSubjects, setSubjectsCurrentPage, sortSubjectRows } from '../../store/actions';
import { DefaultTable } from '../../shared/components/Tables';
import SubjectResultRow from '../../components/Subjects/SubjectResultRow';
import { Pagination } from '../../components/Pagination';

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
  sortDirection,
  currentPage,
  lastPage
}) {
  useEffect(async () => {
    console.log('fetching subjects');
    await getSubjects();
  }, [currentPage]);

  console.log(lastPage);

  if (subjects.length < 1) {
    return <div>Loading subjects...</div>;
  }

  return (
    <>
      <Pagination
        current={currentPage}
        lastPage={lastPage}
        setPage={(page) => console.log(page)}
      />
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
          <SubjectResultRow
            key={subject.id}
            subject={subject}
            onClick={() => onRowClick(subject)}
          />
        ))}
      </DefaultTable>
    </>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.admin.subjects.data,
  fetched: state.admin.subjects.fetched,
  sortCol: state.admin.subjects.sortCol,
  sortDirection: state.admin.subjects.sortDirection,
  currentPage: state.admin.subjects.currentPage,
  lastPage: state.admin.subjects.lastPage,
});

const mapDispatchToProps = (dispatch) => ({
  getSubjects: () => dispatch(fetchSubjects()),
  sortSubjects: (col) => dispatch(sortSubjectRows(col)),
  setPage: (page) => dispatch(setSubjectsCurrentPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSubjects);
