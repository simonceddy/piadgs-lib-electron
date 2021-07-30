/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { SingleFieldForm } from '../../shared/components/Forms';
import Modal from '../../shared/components/Modal';
import { ThemedButton } from '../../shared/components/Styled';
import {
  fetchAuthors,
  setAuthorsCurrentPage,
  setAuthorsFilter,
  setFilteringAuthors,
  sortAuthorRows
} from '../../store/actions';
import TableBuilder from '../TableBuilder';
import Author from './Author';
import CreateAuthor from './CreateAuthor';

const columns = [
  {
    key: 'surname',
    name: 'Surname',
    sortable: true,
  },
  {
    key: 'given_names',
    name: 'Given Names',
    sortable: true,
  },
  {
    key: 'total',
    name: 'Number of Titles',
    sortable: true,
  },
  {
    key: 'created_at', name: 'Created at', sortable: true,
  },
  {
    key: 'updated_at', name: 'updated at', sortable: true,
  },
];

function ManageAuthors({
  currentPage,
  lastPage,
  setPage,
  searchInput = '',
  sortCol,
  sortDirection,
  handleSort = () => {},
  heading = 'Authors',
  fetchData = () => null,
  rows = [],
  itemsPerPage,
  filter = {},
  setFilter = () => {},
  setFiltering = () => {}
}) {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);

  const onClose = () => setShowModal(false);

  const AuthorModal = () => (!showModal ? null : (
    <Modal onClose={onClose}>
      <Author
        onClose={onClose}
        id={showModal}
        onDataChange={fetchData}
      />
    </Modal>
  ));

  const clearFilter = () => Promise.resolve(setFilter({}))
    .then(() => {
      setFiltering(false);
      fetchData();
    });

  useEffect(async () => {
    await fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <FlexCol className="w-full h-full justify-start items-center overflow-scroll">
      {showModal ? <AuthorModal /> : null}
      {/* {showModal ? <SubjectModal onClose={onClose} /> : null} */}
      <FlexRow className="w-full flex flex-row justify-start items-center p-2">{heading}</FlexRow>
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
              if (filter.surname) clearFilter();
            }}
          >
            {filter.surname ? 'Show All' : 'Filter'}
          </ThemedButton>
          <ThemedButton
            className="mx-1"
            onClick={() => setShowNewForm(!showNewForm)}
          >
            {showNewForm ? 'Hide Form' : 'Add New'}
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
            submitLabel="Filter Authors by Name"
            input={filter.surname || ''}
            setInput={(input) => setFilter({ surname: input })}
            onSubmit={fetchData}
            clear={clearFilter}
          />
        </FlexRow>
      ) : null}
      {showNewForm ? (
        <FlexRow>
          <CreateAuthor
            setMessage={setMessage}
            onCreated={() => {
              fetchData();
              setShowNewForm(false);
            }}
          />
        </FlexRow>
      ) : null}
      <FlexRow className="p-1 w-full">
        {rows.length > 0 ? (
          <TableBuilder
            columns={columns}
            rows={rows}
            sortColumn={sortCol}
            sortDirection={sortDirection}
            handleSort={(e) => {
              console.log(e.target.id);
              handleSort(e.target.id);
            }}
            onRowClick={(author) => setShowModal(author.id)}
          />
        ) : null}
      </FlexRow>
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  rows: state.admin.authors.data,
  fetched: state.admin.authors.fetched,
  sortCol: state.admin.authors.sortCol,
  sortDirection: state.admin.authors.sortDirection,
  itemsPerPage: state.admin.authors.itemsPerPage,
  currentPage: state.admin.authors.currentPage,
  lastPage: state.admin.authors.lastPage,
  searchInput: state.authors.authorSearch.input,
  filter: state.admin.authors.filter,
  filtering: state.admin.authors.filtering,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchAuthors()),
  handleSort: (col) => dispatch(sortAuthorRows(col)),
  setPage: (page) => dispatch(setAuthorsCurrentPage(page)),
  setFilter: (filter) => dispatch(setAuthorsFilter(filter)),
  setFiltering: (filtering) => dispatch(setFilteringAuthors(filtering))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthors);
