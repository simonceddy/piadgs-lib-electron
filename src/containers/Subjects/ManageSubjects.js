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
  // { key: 'select', name: 'Select', sortable: false },
  { key: 'row', name: 'Row', sortable: false },
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

function ManageSubjects({
  getData = () => {},
  // fetched = false,
  currentPage,
  lastPage,
  setPage,
  searchInput,
  setSearchInput = '',
  submitSearch,
  rows = [],
  sortCol,
  sortDirection,
  handleSort,
  itemsPerPage
}) {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [message, setMessage] = useState(false);

  const onClose = () => setShowModal(false);

  // TODO pass subject data instead of id - needless db call since data has titles
  const SubjectModal = ({ subject }) => (
    <Modal onClose={onClose}>
      <Subject
        onClose={onClose}
        id={subject.id}
        onDataChange={getData}
      />
    </Modal>
  );

  const fetchData = () => {
    getData(searchInput.trim().length === 0 ? {} : {
      name: searchInput
    });
  };

  useEffect(() => fetchData(), [currentPage]);

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
      {showModal ? <SubjectModal subject={showModal} /> : null}
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
              fetchData();
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
            onClick={() => setShowNewForm(!showNewForm)}
          >
            {showNewForm ? 'Hide Form' : 'Add New'}
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
      {showNewForm ? (
        <FlexRow className="w-full justify-between items-center">
          <CreateSubject
            setMessage={setMessage}
            onCreated={fetchData}
          />
        </FlexRow>
      ) : null}
      <FlexCol className="p-1 w-full">
        {rows.length > 0 ? (
          <>
            <Pagination
              current={currentPage}
              lastPage={lastPage}
              setPage={setPage}
            />
            <TableBuilder
              columns={columns}
              rows={rows}
              sortColumn={sortCol}
              sortDirection={sortDirection}
              handleSort={(e) => {
                console.log(e.target.id);
                handleSort(e.target.id);
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
      here
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  rows: state.subjects.subjects.data,
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
  getData: () => dispatch(fetchSubjects()),
  handleSort: (col) => dispatch(sortSubjectRows(col)),
  setPage: (page) => dispatch(setSubjectsCurrentPage(page)),
  setSearchInput: (input) => dispatch(setSubjectSearchInput(input)),
  submitSearch: (input) => dispatch(performSubjectSearch(input)),
  setIsSearching: (isSearching = false) => dispatch(setFilteringSubjects(isSearching))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubjects);
