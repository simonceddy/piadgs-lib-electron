/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../components/Pagination';
import { FlexCol, FlexRow } from '../../shared/components/Flex';
import { SingleFieldForm } from '../../shared/components/Forms';
import { ThemedButton } from '../../shared/components/Styled';
import {
  fetchAuthors,
  fetchAuthorsSearchResults,
  setAuthorsCurrentPage,
  setAuthorsSearchInput,
  sortAuthorRows
} from '../../store/actions';
import TableBuilder from '../TableBuilder';

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
  data = [],
  searchInput = '',
  setSearchInput,
  submitSearch,
  sortCol,
  sortDirection,
  sortAuthors = () => {},
  heading = 'Authors',
  getAuthors = () => null
}) {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onClose = () => setShowModal(false);
  // console.log(subjects);
  useEffect(async () => {
    // console.log('fetching subjects');
    await getAuthors();
  }, [currentPage]);

  return (
    <FlexCol className="w-full h-full justify-start items-center overflow-scroll">
      {/* {showModal ? <SubjectModal onClose={onClose} /> : null} */}
      <FlexRow className="w-full flex flex-row justify-start items-center p-2">{heading}</FlexRow>
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
            onClick={() => setShowNewEntryForm(!showNewEntryForm)}
          >
            {showNewEntryForm ? 'Hide Form' : 'Add New'}
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
            input={searchInput}
            setInput={setSearchInput}
            onSubmit={submitSearch}
          />
        </FlexRow>
      ) : null}
      {showNewEntryForm ? (<FlexRow>New author form</FlexRow>) : null}
      <FlexRow className="p-1 w-full">
        {data.length > 0 ? (
          <TableBuilder
            columns={columns}
            rows={data}
            sortColumn={sortCol}
            sortDirection={sortDirection}
            handleSort={(e) => {
              console.log(e.target.id);
              sortAuthors(e.target.id);
            }}
          />
        ) : null}
      </FlexRow>
    </FlexCol>
  );
}

const mapStateToProps = (state) => ({
  data: state.admin.authors.data,
  fetched: state.admin.authors.fetched,
  sortCol: state.admin.authors.sortCol,
  sortDirection: state.admin.authors.sortDirection,
  itemsPerPage: state.admin.authors.itemsPerPage,
  currentPage: state.admin.authors.currentPage,
  lastPage: state.admin.authors.lastPage,
  searchInput: state.authors.authorSearch.input,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(fetchAuthors()),
  sortAuthors: (col) => dispatch(sortAuthorRows(col)),
  setPage: (page) => dispatch(setAuthorsCurrentPage(page)),
  submitSearch: (input) => dispatch(fetchAuthorsSearchResults(input)),
  setSearchInput: (input) => dispatch(setAuthorsSearchInput(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthors);
