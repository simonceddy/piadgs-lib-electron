/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { connect } from 'react-redux';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import {
  fetchSubjects,
  setSubjectsCurrentPage,
  sortSubjectRows
} from '../../store/actions';

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

function ManageSubjects() {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewSubjectForm, setShowNewSubjectForm] = useState(false);

  // - subjects header
  // - toolbar/page options/pagination
  // - search section (toggled)
  // - create new section (toggled)
  // - subjects table
  //   - if search submit show search results
  //   - else show all subjects

  return (
    <FlexCol>
      <FlexRow>Subjects</FlexRow>
      <FlexRow>Toolbar - pagination</FlexRow>
      {showSearchForm ? (<FlexRow>Search form</FlexRow>) : null}
      {showNewSubjectForm ? (<FlexRow>New subject form</FlexRow>) : null}
      <FlexRow>
        Data table
      </FlexRow>
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  subjects: state.subjects.subjects.data,
  fetched: state.subjects.subjects.fetched,
  sortCol: state.subjects.subjects.sortCol,
  sortDirection: state.subjects.subjects.sortDirection,
  currentPage: state.subjects.subjects.currentPage,
  lastPage: state.subjects.subjects.lastPage,
  itemsPerPage: state.subjects.subjects.itemsPerPage,
});

const mapDispatchToProps = (dispatch) => ({
  getAllSubjects: () => dispatch(fetchSubjects()),
  sortSubjects: (col) => dispatch(sortSubjectRows(col)),
  setPage: (page) => dispatch(setSubjectsCurrentPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubjects);
