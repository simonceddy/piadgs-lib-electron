import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../TableBuilder';
import { Pagination } from '../../components/Pagination';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { SingleFieldForm } from '../../shared/components/Forms';
import { ThemedButton } from '../../shared/components/Styled';
import {
  fetchSubjects,
  setFilteringSubjects,
  // performSubjectSearch,
  setSubjectsCurrentPage,
  // setSubjectSearchInput,
  setSubjectsFilter,
  setSubjectsItemsPerPage,
  sortSubjectRows
} from '../../store/actions';
import Modal from '../../shared/components/Modal';
import Subject from './Subject';
import CreateSubject from './CreateSubject';
import ItemsPerPageSelector from '../../components/Forms/ItemsPerPageSelector';

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
  fetchData = () => {},
  // fetched = false,
  currentPage,
  lastPage,
  setPage,
  rows = [],
  sortCol,
  sortDirection,
  handleSort,
  itemsPerPage,
  filter = {},
  setFilter = () => {},
  setFiltering = () => {},
  setPerPage
}) {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);

  const onClose = () => setShowModal(false);

  // TODO pass subject data instead of id - needless db call since data has titles
  const SubjectModal = ({ subject }) => (
    <Modal onClose={onClose}>
      <Subject
        onClose={onClose}
        id={subject.id}
        onDataChange={fetchData}
      />
    </Modal>
  );

  const clearFilter = () => Promise.resolve(setFilter({}))
    .then(() => {
      setFiltering(false);
      fetchData();
    });

  useEffect(() => fetchData(), [currentPage, itemsPerPage]);

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
              setShowSearchForm(!showSearchForm);
              if (filter.name) clearFilter();
            }}
          >
            {filter.name ? 'Show All' : 'Filter'}
          </ThemedButton>
          <ThemedButton
            className="mx-1"
            onClick={() => setShowNewForm(!showNewForm)}
          >
            {showNewForm ? 'Hide Form' : 'Add New'}
          </ThemedButton>
        </FlexRow>
        <FlexRow className="">
          <Pagination
            current={currentPage}
            lastPage={lastPage}
            setPage={setPage}
          />
          <ItemsPerPageSelector
            current={itemsPerPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          />
        </FlexRow>
      </FlexRow>
      {showSearchForm ? (
        <FlexRow>
          <SingleFieldForm
            clear={clearFilter}
            placeholder="Subject name"
            submitLabel="Filter"
            input={filter.name || ''}
            setInput={(input) => setFilter({ name: input })}
            onSubmit={() => {
              setFiltering(true);
              fetchData();
            }}
          />
        </FlexRow>
      ) : null}
      {showNewForm ? (
        <FlexRow className="w-full justify-between items-center">
          <CreateSubject
            setMessage={setMessage}
            onCreated={() => {
              fetchData();
              setShowNewForm(false);
            }}
          />
        </FlexRow>
      ) : null}
      <FlexCol className="p-1 w-full">
        {rows.length > 0 ? (
          <>
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
  filter: state.subjects.subjects.filter,
  filtering: state.subjects.subjects.filtering,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchSubjects()),
  handleSort: (col) => dispatch(sortSubjectRows(col)),
  setPage: (page) => dispatch(setSubjectsCurrentPage(page)),
  setPerPage: (perPage) => dispatch(setSubjectsItemsPerPage(perPage)),
  setFilter: (filter) => dispatch(setSubjectsFilter(filter)),
  setFiltering: (filtering) => dispatch(setFilteringSubjects(filtering))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubjects);
