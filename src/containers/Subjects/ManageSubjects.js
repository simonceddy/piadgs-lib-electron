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
import CreateSubject from './CreateSubject';

const columns = [
  { key: 'row', name: 'Row', sortable: false },
  // { key: 'manage', name: 'Manage', sortable: false },
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
  { key: 'created_at', name: 'Created At', sortable: true },
  { key: 'updated_at', name: 'updated At', sortable: true },
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
  itemsPerPage
}) {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewSubjectForm, setShowNewSubjectForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [message, setMessage] = useState(false);

  const onClose = () => setShowModal(false);
  // console.log(subjects);
  useEffect(() => {
    // console.log('fetching subjects');
    if (!filtering) getAllSubjects();
  }, [currentPage]);

  // TODO
  // - create new section (toggled)
  // - subjects table
  //  - move filter into get functionality instead of separate controllers
  // - handle on row click
  //  - bring up subject modal with titles
  //  - use editable modal from previous
  // - select and delete many
  // - update data when a change occurs

  // TODO sort by totals

  return (
    <FlexCol className="w-full h-full justify-start items-center overflow-scroll">
      {showModal ? <SubjectModal onClose={onClose} subject={showModal} /> : null}
      <FlexRow className="w-full flex flex-row justify-start items-center p-2">Subjects</FlexRow>
      {!message ? null : (
        <FlexRow
          className="w-full flex flex-row justify-between items-center p-2"
        >
          <span>
            {message}
          </span>
          <ThemedButton onClick={() => setMessage(false)}>
            OK
          </ThemedButton>
        </FlexRow>
      )}
      <FlexRow className="w-full flex flex-row justify-between items-center p-2">
        <FlexRow
          className="flex flex-row justify-start items-center mr-4"
        >
          <ThemedButton
            className="mx-1"
            onClick={() => {
              setFiltering(false);
              getAllSubjects();
            }}
          >
            Show All
          </ThemedButton>
          <ThemedButton
            className="mx-1"
            onClick={() => setShowSearchForm(!showSearchForm)}
          >
            Filter
          </ThemedButton>
          <ThemedButton
            className="mx-1"
            onClick={() => setShowNewSubjectForm(!showNewSubjectForm)}
          >
            {showNewSubjectForm ? 'Hide Form' : 'Add New'}
          </ThemedButton>
        </FlexRow>
      </FlexRow>
      {showSearchForm ? (
        <FlexRow>
          <SingleFieldForm
            placeholder="Subject name"
            submitLabel="Filter"
            input={searchInput}
            setInput={setSearchInput}
            onSubmit={(input) => {
              submitSearch(input);
              // setFiltering(true);
            }}
          />
        </FlexRow>
      ) : null}
      {showNewSubjectForm ? (
        <FlexRow className="w-full justify-between items-center">
          <CreateSubject
            setMessage={setMessage}
          />
        </FlexRow>
      ) : null}
      <FlexCol className="p-1 w-full">
        {subjects.length > 0 ? (
          <>
            <Pagination
              current={currentPage}
              lastPage={lastPage}
              setPage={setPage}
            />
            <TableBuilder
              columns={columns}
              rows={subjects}
              sortColumn={sortCol}
              sortDirection={sortDirection}
              handleSort={(e) => {
                console.log(e.target.id);
                sortSubjects(e.target.id);
              }}
              dataHandlers={{
              // manage: (data) => <input value={data.id} type="checkbox" />,
                row: (data, index) => (
                  <span className="text-sm">
                    {index + 1 + ((currentPage - 1) * itemsPerPage)}
                  </span>
                ),
              // created_at: (data) => {
              //   console.log(new Date());
              // }
              }}
              onRowClick={(subject) => setShowModal(subject)}
            />
            <Pagination
              current={currentPage}
              lastPage={lastPage}
              setPage={setPage}
            />
          </>
        ) : null}
      </FlexCol>
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
