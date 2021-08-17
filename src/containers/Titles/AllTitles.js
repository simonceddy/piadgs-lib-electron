import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ItemsPerPageSelector from '../../components/Forms/ItemsPerPageSelector';
import { Pagination } from '../../components/Pagination';
import TitleTableRow from '../../components/Titles/TitleTableRow';
import { FlexRow } from '../../shared/components/Flex';
import { SingleFieldForm } from '../../shared/components/Forms';
import Modal from '../../shared/components/Modal';
import { ThemedButton } from '../../shared/components/Styled';
import { DefaultTable } from '../../shared/components/Tables';
import { titleCols } from '../../shared/data/titleCols';
import {
  fetchTitlesData,
  setCurrentPage,
  setItemsPerPage,
  setTitlesFilter,
  sortTitleRows
} from '../../store/actions';
import Title from './Title';

function AllTitles({
  titles = [],
  getTitles,
  currentPage,
  setPage,
  sortColumn,
  sortDirection,
  sortTitles,
  lastPage,
  itemsPerPage,
  setPerPage,
  filter = {},
  clearFilter = () => {},
  setFilter = () => {}
}) {
  // const [showSearchForm, setShowSearchForm] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  const onClose = () => setTitleModal(false);

  const TitleModal = () => (!titleModal ? null : (
    <Modal
      onClose={onClose}
    >
      <Title
        onClose={onClose}
        title={titleModal}
        onTitleChange={getTitles}
      />
    </Modal>
  ));

  useEffect(async () => {
    // console.log('fetching titles');
    await getTitles();
  }, [currentPage, sortColumn, sortDirection, itemsPerPage]);

  // console.log(titles);

  const onRowClick = (title) => setTitleModal(title);

  return (
    <>
      <TitleModal />
      <FlexRow
        className="flex flex-row justify-start items-center mr-4"
      >
        <ThemedButton
          className="mx-1"
          onClick={() => {
            setShowSearchForm(!showSearchForm);
            if (filter.title) clearFilter();
          }}
        >
          {filter.title ? 'Show All' : 'Filter'}
        </ThemedButton>
        <ThemedButton
          className="mx-1"
          onClick={() => setShowNewForm(!showNewForm)}
        >
          {showNewForm ? 'Hide Form' : 'Add New'}
        </ThemedButton>
      </FlexRow>
      <FlexRow className="w-full">
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
      {showSearchForm ? (
        <FlexRow>
          <SingleFieldForm
            submitLabel="Filter by Title"
            input={filter.title || ''}
            setInput={(input) => setFilter({ title: input })}
            onSubmit={getTitles}
            clear={clearFilter}
          />
        </FlexRow>
      ) : null}
      {titles.length < 1 ? 'Loading...' : (
        <>
          <DefaultTable
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            columns={titleCols}
            handleSort={(e) => sortTitles(e.target.id)}
          >
            {titles.map((title = {}) => (
              <TitleTableRow
                onClick={() => onRowClick(title)}
                key={title.id}
                title={title}
                columns={titleCols}
              />
            ))}
          </DefaultTable>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  itemsPerPage: state.titles.titles.itemsPerPage,
  currentPage: state.titles.titles.currentPage,
  lastPage: state.titles.titles.lastPage,
  titles: state.titles.titles.titles,
  sortDirection: state.titles.titles.sortDirection,
  sortColumn: state.titles.titles.sortColumn,
  filter: state.titles.titles.filter
});

const mapDispatchToProps = (dispatch) => ({
  getTitles: () => dispatch(fetchTitlesData()),
  setPage: (page) => dispatch(setCurrentPage(page)),
  sortTitles: (col) => dispatch(sortTitleRows(col)),
  setPerPage: (amount) => dispatch(setItemsPerPage(amount)),
  setFilter: (filter) => dispatch(setTitlesFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTitles);
