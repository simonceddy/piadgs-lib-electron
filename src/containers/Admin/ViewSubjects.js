import { useEffect } from 'react';
import { connect } from 'react-redux';
// import { FlexCol } from '../../shared/components/Flex';
import { fetchSubjects } from '../../store/actions';
import { ListLink } from '../../shared/components/List';

function ViewSubjects({ subjects = [], fetched, getSubjects }) {
  useEffect(() => {
    if (!fetched) {
      getSubjects();
    }
  }, [fetched]);

  return (
    <>
      Subjects list
      {subjects.map((subject, key) => (
        <ListLink key={key} to={`/admin/subject/${subject.id}`}>{subject.name}</ListLink>
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.admin.subjects.data,
  fetched: state.admin.subjects.fetched
});

const mapDispatchToProps = (dispatch) => ({
  getSubjects: () => dispatch(fetchSubjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewSubjects);
