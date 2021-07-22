/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../TableBuilder';
import { Pagination } from '../../components/Pagination';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { SingleFieldForm } from '../../shared/components/Forms';
import { ThemedButton } from '../../shared/components/Styled';
import {
  fetchSubjects,
  performSubjectSearch,
  setSubjectsCurrentPage,
  setSubjectSearchInput,
  setFilteringSubjects,
  sortSubjectRows
} from '../../store/actions';
import Modal from '../../shared/components/Modal';
import Subject from './Subject';

const columns = [
  {
    key: 'name',
    name: 'Subject Name',
    sortable: true
  },
  {
    key: 'total',
    name: 'Number of Titles',
    sortable: true
  },
  { key: 'created_at', name: 'Created At' },
  { key: 'updated_at', name: 'updated At' },
];

const SubjectModal = ({ onClose, subject }) => (
  <Modal onClose={onClose}>
    <Subject onClose={onClose} id={subject.id} />
  </Modal>
);

function ManageSubjects({
  getAllSubjects = () => {},
  // fetched = false,
  currentPage,
  lastPage,
  setPage,
  searchInput,
  setSearchInput,
  submitSearch,
  subjects = [],
  sortCol,
  sortDirection,
  sortSubjects,
  isSearching = false,
  setIsSearching = () => {}
}) {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewSubjectForm, setShowNewSubjectForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);
  // console.log(subjects);
  useEffect(async () => {
    // console.log('fetching subjects');
    await getAllSubjects();
  }, [currentPage]);

  // TODO
  // - create new section (toggled)
  // - subjects table
  //   - if search submit show search results
  //   - else show all subjects
  // - handle on row click
  //  - bring up subject modal with titles
  //  - use editable modal from previous
  // - select and delete many
  // - update data when a change occurs

  // TODO sort by totals

  return (
    <FlexCol className="w-full h-full justify-start items-center overflow-scroll">
      {showModal ? <SubjectModal onClose={onClose} /> : null}
      <FlexRow className="w-full flex flex-row justify-start items-center p-2">Subjects</FlexRow>
      <FlexRow className="w-full flex flex-row justify-between items-center p-2">
        <FlexRow
          className="flex flex-row justify-start items-center mr-4"
        >
          <ThemedButton
            onClick={() => setShowSearchForm(!showSearchForm)}
          >
            Filter
          </ThemedButton>
          <ThemedButton
            onClick={() => setShowNewSubjectForm(!showNewSubjectForm)}
          >
            {showNewSubjectForm ? 'Hide Form' : 'Add New'}
          </ThemedButton>
        </FlexRow>

        <Pagination
          current={currentPage}
          lastPage={lastPage}
          setPage={setPage}
        />
      </FlexRow>
      {showSearchForm ? (
        <FlexRow>
          <SingleFieldForm
            submitLabel="Search Subjects"
            input={searchInput}
            setInput={setSearchInput}
            onSubmit={submitSearch}
          />
        </FlexRow>
      ) : null}
      {showNewSubjectForm ? (<FlexRow>New subject form</FlexRow>) : null}
      <FlexRow className="p-1 w-full">
        {subjects.length > 0 ? (
          <TableBuilder
            columns={columns}
            rows={subjects}
            sortColumn={sortCol}
            sortDirection={sortDirection}
            handleSort={(e) => {
              console.log(e.target.id);
              sortSubjects(e.target.id);
            }}
          />
        ) : null}
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
  searchInput: state.subjects.subjectSearch.input,
  isSearching: state.subjects.subjects.filtering
});

const mapDispatchToProps = (dispatch) => ({
  getAllSubjects: () => dispatch(fetchSubjects()),
  sortSubjects: (col) => dispatch(sortSubjectRows(col)),
  setPage: (page) => dispatch(setSubjectsCurrentPage(page)),
  setSearchInput: (input) => dispatch(setSubjectSearchInput(input)),
  submitSearch: (input) => dispatch(performSubjectSearch(input)),
  setIsSearching: (isSearching = false) => dispatch(setFilteringSubjects(isSearching))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubjects);
